import ReactModal from "react-modal";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Avatar from "components/Avatar/avatar";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import "./modals.scss";
import { useEffect, useState } from "react";
import { Student } from "@shared/User";
import { toastError } from "components/Toast/toast";
import { getAdminStudents } from "api/admin/admin-manage-users";
import { useParams } from "react-router-dom";

interface ModalProps {
    onClose: ()=>void
}
export default function AddStudents({onClose}: ModalProps){
    const [students, setStudents] = useState<Student[]>([]);
    const fetchStudent = async(s = "") => {
        const res = await getAdminStudents(s);
        if(res.error) return toastError("Error while fetching students");
        setStudents(res.data);
    }
    useEffect(()=>{
        fetchStudent()
    }, [])
    return(
        <ReactModal isOpen overlayClassName="modal-overlay" className="add-students-modal">
            <header>
                <SearchInput onChange={val=>fetchStudent(val)} />
                <div className="cross center" onClick={onClose}>
                    <CloseRoundedIcon />
                </div>
            </header>
            <div className = "item-container">
                {
                    students.map((x, i)=><StudentItem data = {x} key = {i} />)
                }
            </div>
            
        </ReactModal>

    )
}

function SearchInput({onChange}: {onChange: (val: string)=>void}){
    return(
        <div className = "search-input-container">
            <div className = "search-icon">
                <SearchRoundedIcon />
            </div>
            <input placeholder="Search" onChange={(e)=>onChange(e.target.value)} />
        </div>
    )
}

function StudentItem({data}: {data: Student}){
    const class_id = useParams().class_id;
    const [hasChanged, setHasChanged] = useState(data.class_id === class_id);
    return(
        <div className = "add-student-item">
            <Avatar src = {data.profile_picture_url} size={30} />
            <span>{data.full_name}</span>
            <button disabled = {hasChanged}>CHANGE</button>
        </div>
    )
}