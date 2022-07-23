import { Post } from "@shared/Post";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import moment from "moment"
import "./post-page.scss";
import MobileStackHeader from "components/header/mobile-header";
import StackContainer from "container/mobile-layouts/stack-container";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById, likePost, unlikePost } from "api/post";
import { toastError } from "components/Toast/toast";
import { useDispatch } from "react-redux";
import { likePostAction, unlikePostAction } from "redux/Feed/feedActions";

export default function PostPage(){
    const post_id = useParams().post_id
    const state:any = useLocation().state;
    const [post, setPost] = useState<Post>(state?.post as Post);
    const [loading, setLoading] = useState(false)
    const getPost = async() => {
        if(post) return;
        setLoading(true);
        const res = await getPostById(post_id||"");
        if(res.error){
            toastError(res.message);
            return;
        }
        setPost(res.data);
        setLoading(false);
    }
    useEffect(()=>{
        getPost();
        window.history.replaceState({}, document.title)
    }, [])
    return(
        <>
            <MobileStackHeader label="Post" />
            <StackContainer className="post-page">
                {post && <Content data = {post} />}
            </StackContainer>
        </>
        
    )
}

function Content({data}: {data: Post}){
    const [like_count, setLike_count] = useState(data.like_count);
    const [has_liked, setHas_liked] = useState(data.has_liked);
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
            <div className = "post-card-author-container">
                <div className = "post-card-pfp-container">
                    <img className="full-img" src = {data.author_data.profile_picture_url} />
                </div>
                <div className="post-card-author-info">
                    <div className="post-card-author-name">{`${data.author_data.full_name}` }</div>
                    <div className="post-card-category">{data.category} • <span className = "post-card-time">{ moment(data.createdAt).fromNow(true) }</span> </div>

                </div>
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
                    <button><ForumOutlinedIcon /></button>
                    <span>1k</span>
                </div>
            </div>
        </article>
    )
}