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
import { addStudent } from "api/admin/admin-classes";

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
        <ReactModal closeTimeoutMS={200} isOpen overlayClassName="modal-overlay" className="add-students-modal">
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
    const [isLoading, setIsLoading] = useState(false);
    const add = async() => {
        if(!class_id) return;
        if(isLoading) return;
        setIsLoading(true);
        const res = await addStudent(class_id, data.user_id);
        setIsLoading(false);
        if(res.error) return toastError(res.message);
        setHasChanged(true);
    }
    return(
        <div className = "add-student-item">
            <Avatar src = {data.profile_picture_url} size={30} />
            <span>{data.full_name}</span>
            <button onClick={add} disabled = {hasChanged||isLoading}>{isLoading?"ADDING":"CHANGE"}</button>
        </div>
    )
}