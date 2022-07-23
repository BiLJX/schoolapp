import { useSelector } from "react-redux"
import ReactTextareaAutosize from "react-textarea-autosize"
import { RootState } from "types/states"
import "./comment-input.scss"
export default function CommentInput(){
    const currentUser = useSelector((state: RootState)=>state.currentUser)
    return (
        <div className = "comment-input-container">
            <div className = "comment-input-pfp">
                <img className="full-img" src = {currentUser?.profile_picture_url} />
            </div>
            <div className = "comment-input">
                <ReactTextareaAutosize placeholder="Add a comment" />
                <button>Post</button>
            </div>
        </div>
    )
}