import { Comment, Post } from "@shared/Post";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import moment from "moment"
import "./post-page.scss";
import MobileStackHeader from "components/header/mobile-header";
import StackContainer from "container/mobile-layouts/stack-container";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById, likePost, unlikePost } from "api/post";
import { toastError } from "components/Toast/toast";
import { useDispatch, useSelector } from "react-redux";
import { likePostAction, unlikePostAction } from "redux/Feed/feedActions";
import CommentInput from "components/Comment-Input/comment-input";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostOptions from "components/post/post-options";
import { RootState } from "types/states";
import CommentComponent from "components/Comment/comment-component";
import { getComment } from "api/comment";
import { getMappedComments } from "utils/comments";

export default function PostPage(){
    const post_id = useParams().post_id
    const state:any = useLocation().state;
    const [comment, setComment] = useState<Comment|null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [mappedComments, setMappedComments] = useState<Comment[]>([]);
    const [post, setPost] = useState<Post>(state?.post as Post);
    const getPost = async() => {
        if(post) return;
        const res = await getPostById(post_id||"");
        if(res.error){
            toastError(res.message);
            return;
        }
        setPost(res.data);
    }
    const getComments = async() => {
        if(!post_id) return;
        const res = await getComment(post_id);
        if(res.error) toastError(res.message);
        setComments(res.data);
        setMappedComments(getMappedComments(res.data, null));
    }
    useEffect(()=>{
        setMappedComments(getMappedComments(comments, null));
    }, [comments])
    useEffect(()=>{
        getPost();
        getComments()
        window.history.replaceState({}, document.title)
    }, [])
    return(
        <>
            <MobileStackHeader goBack label="Post" />
            <StackContainer className="post-page" style={comment ? {paddingBottom: "115px"} : {paddingBottom: "74px"}}>
                {post && <Content data = {post} />}
                <div className = "comments-container">
                    {
                        mappedComments.map((x, i)=> <CommentComponent comment={x} key= {i} onReplyClicked={(comment)=>setComment(comment)} />)
                    }
                </div>
                <CommentInput onReplyClose={()=>setComment(null)} onComment={(c)=>setComments([c, ...comments])} data={post} comment = {comment} />
            </StackContainer>
        </>
        
    )
}






function Content({data}: {data: Post}){
    const currentUser = useSelector((state: RootState)=>state.currentUser)
    const [like_count, setLike_count] = useState(data.like_count);
    const [has_liked, setHas_liked] = useState(data.has_liked);
    const [optionOpened, setOptionOpened] = useState(false)
    const dispatch = useDispatch()
    const onLike = async () => {
        setLike_count(like_count+1);
        setHas_liked(true);
        const res = await likePost(data.post_id);
        if(res.error) return toastError(res.message)
        dispatch(likePostAction(data.post_id))
    }
    const onUnlike = async () => {
        setLike_count(like_count-1);
        setHas_liked(false)
        const res = await unlikePost(data.post_id);
        if(res.error) return toastError(res.message)
        dispatch(unlikePostAction(data.post_id))
    }
    return(
        <article className = "post-card">
            <PostOptions isOpen = {optionOpened} postId = {data.post_id} onClose = {()=>setOptionOpened(false)} />
            <div className = "post-card-author-container">
                <div className = "post-card-pfp-container">
                    <img className="full-img" src = {data.author_data.profile_picture_url} />
                </div>
                <div className="post-card-author-info">
                <NavLink onClick={(e)=>e.stopPropagation()} to = {`/${data.author_data.type}/${data.author_data.user_id}`} className="post-card-author-name">{`${data.author_data.full_name}`}</NavLink>
                    <div className="post-card-category">{data.category} • <span className = "post-card-time">{ moment(data.createdAt).fromNow(true) }</span> </div>
                </div>
                {currentUser?.user_id === data.author_id && <button className = "post-card-more" onClick={()=>setOptionOpened(true)}><MoreVertIcon /></button>}
            </div>
            <div className = "post-card-title-container">
                {data.title}
            </div>
            {data.post_type === "image"?(
                    <div className = "post-card-content-container">
                        <img className="full-img" src = {data.content_src} />
                    </div>
                ): (
                    <div className = "post-card-body">
                        {data.body}
                    </div>
                )
            }
            <div className = "post-card-buttons-container">
                <div className = "post-card-button">
                    {
                        has_liked?(
                            <button className="liked" onClick = {onUnlike}><FavoriteIcon /></button>
                        ):(
                            <button onClick = {onLike}><FavoriteBorderOutlinedIcon /></button>
                        )
                    }
                   
                    <span>{like_count}</span>
                </div>
                <div className = "post-card-button">
                    <button><ModeCommentOutlinedIcon /></button>
                    <span>{data.comment_count}</span>
                </div>
            </div>
        </article>
    )
}
