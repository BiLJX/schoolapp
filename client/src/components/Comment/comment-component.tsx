import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./comment.scss"
import { Comment } from '@shared/Post';
import moment from 'moment';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { likeComment, unlikeComment } from 'api/comment';
import { toastError } from 'components/Toast/toast';

interface CommentProps {
    onReplyClicked: (comment: Comment) => any;
    comment: Comment
}
export default function CommentComponent(props: CommentProps){
    const data = props.comment;
    const [showChild, setShowChild] = useState(false);
    const [like_count, setLike_count] = useState(data.likes_count);
    const [has_liked, setHas_liked] = useState(data.has_liked);
    const viewReplies = showChild?"Hide Replies ▲":"View Replies ▼";
    const like = async () => {
        setHas_liked(true);
        setLike_count(like_count+1);
        const res = await likeComment(data.comment_id);
        if(res.error){
            setHas_liked(false);
            setLike_count(like_count-1);
            toastError(res.message)
        }
    }
    const unlike = async() => {
        setHas_liked(false);
        setLike_count(like_count-1);
        const res = await unlikeComment(data.comment_id);
        if(res.error){
            setHas_liked(true);
            setLike_count(like_count+1);
            toastError(res.message)
        }
    }
    return(
        <div className = "comment-component">
            <div className = "comment-left">
                <div className = "comment-pfp">
                    <img className='full-img' src = {data.author_data.profile_picture_url} />
                </div>
                <span className = "comment-line" />
            </div>
            <div className = "comment-right">
                <div className = "comment-name">{data.author_data.full_name} • {moment(data.createdAt).fromNow(true)}</div>
                <div className = "comment-content">{data.text}</div>
                <div className = "comment-button-container">
                    <div className = "comment-button" onClick = {()=>props.onReplyClicked(data)}>
                        <KeyboardReturnRoundedIcon />
                        <span>Reply</span>
                    </div>
                    {
                        has_liked?(
                            <div className = "comment-button liked" onClick={unlike}>
                                <FavoriteIcon />
                                <span>{like_count}</span>
                            </div>
                        ):(
                            <div className = "comment-button" onClick={like}>
                                <FavoriteBorderIcon />
                                <span>{like_count}</span>
                            </div>
                        )
                    }
                   
                    
                </div>
                {   data.children?.length !== 0?(
                        <div className = "comment-view-more" onClick={()=>setShowChild(!showChild)}>
                            {showChild?"▲ Hide Replies":"▼ View Replies"}
                        </div>
                    ):null
                }
                
                <div className = "comment-children">
                    {
                        showChild && data.children?.map((x, i)=><CommentComponent comment={x} onReplyClicked = {props.onReplyClicked} key = {i} />)
                    }
                </div>
            </div>
        </div>
    )
}