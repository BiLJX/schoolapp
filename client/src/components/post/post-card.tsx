import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { Post } from '@shared/Post';
import "./post.scss"
export default function PostCard({data}: {data: Post}){
    return(
        <article className = "post-card">
            <div className = "post-card-author-container">
                <div className = "post-card-pfp-container">
                    <img className="full-img" src = {data.author_data.profile_picture_url} />
                </div>
                <div className="post-card-author-info">
                    <div className="post-card-author-name">{data.author_data.full_name}</div>
                    <div className="post-card-category">{data.category} • <span className = "post-card-time">5 min ago</span> </div>

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
                    <button><FavoriteBorderOutlinedIcon /></button>
                    <span>1.1k</span>
                </div>
                <div className = "post-card-button">
                    <button><ForumOutlinedIcon /></button>
                    <span>1k</span>
                </div>
            </div>
        </article>
    )
}