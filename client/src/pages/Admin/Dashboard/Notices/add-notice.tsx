import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Announcement, AnnouncementClientData } from "@shared/Announcement";
import { createAnnouncement } from "api/announcement";
import { toastError } from "components/Toast/toast";
import { useState } from "react";
import ReactModal from "react-modal";
import ReactTextareaAutosize from "react-textarea-autosize";
import "./add-notice.scss"

interface Props {
    onClose: ()=>void;
    onNoticeAdded: (notice: Announcement)=>void;
}
export function AddNoticeModal({onClose, onNoticeAdded}: Props){
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<AnnouncementClientData>({
        body: "",
        title: "",
        is_announced_to_teachers: false,
        is_announced_to_students: false
    })
    const onCreate = async () => {
        if(isLoading) return;
        setIsLoading(true);
        const res = await createAnnouncement(data);
        setIsLoading(false);
        if(res.error) return toastError(res.message);
        onNoticeAdded(res.data);
        onClose();
    }
    return(
        <ReactModal className = "add-notice-modal" overlayClassName="modal-overlay" isOpen>
            <header>
                <h1>Create A Notice</h1>
            </header>
            <ReactTextareaAutosize onChange={(e)=>setData({...data, title: e.target.value})} className="notice-title-input" placeholder="Write a title..." />
            <ReactTextareaAutosize onChange={(e)=>setData({...data, body: e.target.value})} minRows={10} maxRows={10} className="notice-body-input" placeholder="Body text..." />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">Announce To</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={(e)=>{
                    e.target.value === "STUDENTS" && setData({...data, is_announced_to_students: true});
                    e.target.value === "TEACHERS" && setData({...data, is_announced_to_teachers: true});
                    e.target.value === "ALL" && setData({...data, is_announced_to_teachers: true, is_announced_to_students: true});
                }}
                >
                    <MenuItem value="STUDENTS">Students</MenuItem>
                    <MenuItem value="TEACHERS">Teachers</MenuItem>
                    <MenuItem value="ALL">Everyone</MenuItem>
                </Select>
            </FormControl>
            <div className = "create-button-container">
                <button className = "cancel" onClick={onClose}>CANCEL</button>
                <button className = "create" onClick={onCreate} disabled = {isLoading}>{isLoading?"CREATING":"CREATE"}</button>
            </div>
        </ReactModal>
    )
}