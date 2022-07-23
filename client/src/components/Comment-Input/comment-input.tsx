import { Comment, Post } from "@shared/Post";
import { addComment, addReply } from "api/comment";
import { toastError } from "components/Toast/toast";
import { useState } from "react";
import { useSelector } from "react-redux"
import ReactTextareaAutosize from "react-textarea-autosize"
import { RootState } from "types/states"
import CloseIcon from '@mui/icons-material/Close';
import "./comment-input.scss"

interface Props {
    data: Post,
    comment: Comment|null,
    onComment: (comment: Comment) => any;
    onReplyClose: ()=>any;
}
export default function CommentInput({data, comment, onComment, onReplyClose}: Props){
    const currentUser = useSelector((state: RootState)=>state.currentUser);
    const [isPosting, setIsPosting] = useState(false);
    const [text, setText] =  useState("");

    
    const createReply = async() => {
        if(!text) return;
        if(!comment) return;
        setIsPosting(true);
        const res = await addReply(comment.comment_id, text);
        if(res.error) {
            setIsPosting(false);
            toastError(res.message);
            return;
        }
        setIsPosting(false);
        setText("");
        onComment(res.data);
    }

    const createComment = async() => {
        if(!text) return;
        setIsPosting(true);
        const res = await addComment(data.post_id, text);
        if(res.error) {
            setIsPosting(false);
            toastError(res.message);
            return;
        }
        setIsPosting(false);
        setText("");
        onComment(res.data);
    }
    if(comment){
        return (
            <div className = "comment-input-container reply">
                <div className = "comment-input-header">
                    <div className = "comment-input-cross" onClick = {onReplyClose}>
                        <CloseIcon />
                    </div>
                    <div className = "comment-input-reply">
                        Replying to <b>Billjesh Man Baidya</b>
                    </div>
                </div>
                <div style = {{display: "flex", width: "100%"}}>
                    <div className = "comment-input-pfp">
                        <img className="full-img" src = {currentUser?.profile_picture_url} />
                    </div>
                    <div className = "comment-input">
                        <ReactTextareaAutosize placeholder="Add a reply..." value={text} onChange = {(e)=>setText(e.target.value)} />
                        {isPosting?<button className="disabled" disabled>Replying</button>:<button onClick={createReply}>Reply</button>}
                    </div>
                </div>
                
            </div>
        )
    }
    return (
        <div className = "comment-input-container">
            <div className = "comment-input-pfp">
                <img className="full-img" src = {currentUser?.profile_picture_url} />
            </div>
            <div className = "comment-input">
                <ReactTextareaAutosize placeholder="Add a comment..." value={text} onChange = {(e)=>setText(e.target.value)} />
                {isPosting?<button className="disabled" disabled>Posting</button>:<button onClick={createComment}>Post</button>}
            </div>
        </div>
    )
}