import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./comment.scss"
import { Comment } from '@shared/Post';

interface CommentProps {
    onReplyClicked: (comment: Comment) => any;
    comment: Comment
}
export default function CommentComponent(props: CommentProps){
    const data = props.comment
    return(
        <div className = "comment-component">
            <div className = "comment-left">
                <div className = "comment-pfp">
                    <img className='full-img' src = {data.author_data.profile_picture_url} />
                </div>
                <span className = "comment-line" />
            </div>
            <div className = "comment-right">
                <div className = "comment-name">{data.author_data.full_name}</div>
                <div className = "comment-content">{data.text}</div>
                <div className = "comment-button-container">
                    <div className = "comment-button" onClick = {()=>props.onReplyClicked(data)}>
                        <KeyboardReturnRoundedIcon />
                        <span>Reply</span>
                    </div>
                    <div className = "comment-button">
                        <FavoriteBorderIcon />
                        <span>69</span>
                    </div>
                </div>
                <div className = "comment-children">
                    {
                        data.children?.map((x, i)=><CommentComponent comment={x} onReplyClicked = {props.onReplyClicked} key = {i} />)
                    }
                </div>
            </div>
        </div>
    )
}