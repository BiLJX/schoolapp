import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Post } from '@shared/Post';
import { likePost, unlikePost } from 'api/post';
import { toastError } from 'components/Toast/toast';
import moment from "moment"
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { likePostAction, unlikePostAction } from 'redux/Feed/feedActions';
import "./post.scss"
export default function PostCard({data}: {data: Post}){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const onLike = async (e: any) => {
        e.stopPropagation();
        dispatch(likePostAction(data.post_id))
        const res = await likePost(data.post_id);
        if(res.error) return toastError(res.message)
    }
    const onUnlike = async (e: any) => {
        e.stopPropagation();
        dispatch(unlikePostAction(data.post_id))
        const res = await unlikePost(data.post_id);
        if(res.error) return toastError(res.message)
    }
    return(
        <article onClick={()=>navigate("/post/"+data.post_id, { state: { post: data } })} className = "post-card">
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
                ): null
            }
            <div className = "post-card-buttons-container">
                <div className = "post-card-button">
                    {
                        data.has_liked?(
                            <button className="liked" onClick = {onUnlike}><FavoriteIcon /></button>
                        ):(
                            <button onClick = {onLike}><FavoriteBorderOutlinedIcon /></button>
                        )
                    }
                    <span>{data.like_count}</span>
                </div>
                <div className = "post-card-button">
                    <button><ForumOutlinedIcon /></button>
                    <span>1k</span>
                </div>
            </div>
        </article>
    )
}