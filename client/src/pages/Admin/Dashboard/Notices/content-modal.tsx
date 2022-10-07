import { Announcement } from "@shared/Announcement";
import { deleteAdminNotice } from "api/admin/admin-dashboard";
import { toastError } from "components/Toast/toast";
import { useState } from "react";
import ReactModal from "react-modal";
import "./content.scss";

interface Props {
    onDelete: (notice_id: string) => void;
    onClose: ()=>void;
    data: Announcement
}
export default function NoticeContentModal({
    onDelete,
    onClose,
    data
}:Props){
    const [loading, setLoading] = useState(false);
    const remove = async() => {
        if(loading) return;
        if(!window.confirm("Are you sure you wanna delete?")) return;
        setLoading(true);
        const res = await deleteAdminNotice(data.announcement_id);
        setLoading(false)
        if(res.error) return toastError("Error while deleting notice");
        onDelete(data.announcement_id);
        onClose();
    }
    return(
        <ReactModal overlayClassName="modal-overlay" className="admin-notice-modal" isOpen>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
            <div className = "delete-notice-container">
                <span>Delete this notice</span>
                <button onClick={remove} disabled = {loading}>{loading?"DELETING":"DELETE"}</button>
            </div>
            <button className="close" onClick={onClose}>CLOSE</button>
        </ReactModal>
    )
}