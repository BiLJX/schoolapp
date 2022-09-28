import { TextField } from "@mui/material";
import { ClassSchema } from "@shared/School";
import { addClass } from "api/admin/admin-classes";
import { toastError } from "components/Toast/toast";
import { useState } from "react";
import ReactModal from "react-modal";
import "./modals.scss"

interface ModalProps {
    onClose: ()=>void;
    onCreate: (class_data: ClassSchema)=>void;
}
export default function AddClassModal({onClose, onCreate}: ModalProps){
    const [grade, setGrade] = useState<number>();
    const [section, setSection] = useState<string>();
    const [loading, setLoading] = useState(false);
    const create = async () => {
        if(loading) return;
        if(!(grade && section)) return;
        setLoading(true);
        const res = await addClass({grade, section});
        setLoading(false);
        if(res.error) return toastError(res.message);
        onCreate(res.data);
        onClose();
    }
    return(
        <ReactModal isOpen overlayClassName="modal-overlay" className="add-class-modal">
            <header>
                <h1>Create Class</h1>
            </header>
            <TextField className="label-input" label="Grade" variant="standard" type="number" onChange={(e)=>setGrade(parseInt(e.target.value))} />
            <TextField className="label-input"label="Section" variant="standard" onChange={(e)=>setSection(e.target.value)} />
            <div className = "add-class-button-container">
                <button className = "cancel" onClick = {onClose}>CANCEL</button>
                <button className = "create" onClick = {create} disabled = {loading}>{loading?"CREATING":"CREATE"}</button>
            </div>
        </ReactModal>
    )
}

