import { deletePost } from "api/post";
import { toastError } from "components/Toast/toast";
import { useState } from "react";
import ReactModal from "react-modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePostAction } from "redux/Feed/feedActions";

interface PostOptionsProps {
    isOpen: boolean,
    postId: string,
    onClose: () => any
}
export default function PostOptions(props: PostOptionsProps){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isDeleting, setIsDeleting] = useState(false)
    const onDelete = async() => {
        if(isDeleting) return;
        setIsDeleting(true);
        const res = await deletePost(props.postId);
        if(res.error){
            setIsDeleting(false)
            return toastError(res.message);
        }
        setIsDeleting(false)
        dispatch(deletePostAction(props.postId))
        props.onClose();
        navigate(-1);
    }
    return(
        <ReactModal onRequestClose={props.onClose} preventScroll shouldCloseOnOverlayClick isOpen = {props.isOpen} overlayClassName = "modal-overlay" className="post-options">
            <div className = "post-options-item" style={{color: "var(--red)"}} onClick = {onDelete}>{isDeleting?"Deleting...":"Delete"}</div>
            <div className = "post-options-item" onClick = {props.onClose}>Cancel</div>
        </ReactModal>
    )
}