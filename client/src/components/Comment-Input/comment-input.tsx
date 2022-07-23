import { Post } from "@shared/Post";
import { addComment } from "api/comment";
import { toastError } from "components/Toast/toast";
import { useState } from "react";
import { useSelector } from "react-redux"
import ReactTextareaAutosize from "react-textarea-autosize"
import { RootState } from "types/states"
import "./comment-input.scss"
export default function CommentInput({data}: {data: Post}){
    const currentUser = useSelector((state: RootState)=>state.currentUser);
    const [isPosting, setIsPosting] = useState(false);
    const [text, setText] =  useState("")
    const onPost = async() => {
        if(!text) return;
        setIsPosting(true);
        const res = await addComment(data.post_id, text);
        if(res.error) toastError(res.message);
        console.log(res.data)
        setIsPosting(false);
        setText("");
    }
    return (
        <div className = "comment-input-container">
            <div className = "comment-input-pfp">
                <img className="full-img" src = {currentUser?.profile_picture_url} />
            </div>
            <div className = "comment-input">
                <ReactTextareaAutosize placeholder="Add a comment" value={text} onChange = {(e)=>setText(e.target.value)} />
                {isPosting?<button className="disabled" disabled>Posting</button>:<button onClick={onPost}>Post</button>}
            </div>
        </div>
    )
}