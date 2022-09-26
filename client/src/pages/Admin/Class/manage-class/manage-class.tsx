import AdminHeader from "components/header/admin-header/admin-header";
import AdminCardContainer from "container/Admin-Cards/admin-card";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import "./manage.scss";
import { useEffect, useState } from "react";
import { Student } from "@shared/User";
import { getAdminClassStudents } from "api/admin/admin-classes";
import { useParams } from "react-router-dom";
import { toastError } from "components/Toast/toast";
import Avatar from "components/Avatar/avatar";
import { InformationError } from "components/Error/error-component";

export default function ManageClassPage(){
    return(
        <>
            <AdminHeader title="Class" sub_title="Manage Individual Classes" />
            <AdminMain className="manage-class-container">
                <StudentsContainer />
                <ClassInfo />
            </AdminMain>
        </>
    )
}

function StudentsContainer(){
    const class_id = useParams().class_id;
    const [students, setStudents] = useState<Student[]>([]);
    const [isFetchingStudents, setIsFetchingStudents] = useState(true)
    useEffect(()=>{
        const getStudents = async() => {
            if(!class_id) return;
            const res = await getAdminClassStudents(class_id);
            setIsFetchingStudents(false);
            if(res.error) return toastError("Error while fetching students");
            setStudents(res.data);
        }
        getStudents()
    }, [])
    return(
        <AdminCardContainer className="manage-class-students-container">
            <header className="container-header">
                <h1 className = "admin-card-heading">Students</h1>
                <div className = "header-add-icon">
                    <AddRoundedIcon />
                </div>
            </header>
            <div className = "student-items-container">
                {
                    !isFetchingStudents && students.length === 0 && (
                        <InformationError title="No students in this class." />
                    )
                }
                {
                    students.map((x, i)=>(
                        <div className="student-item">
                            <Avatar src={x.profile_picture_url} size = {25} />
                            <span>{x.full_name}</span>
                        </div>
                    ))
                }
            </div>
        </AdminCardContainer>
    )
}

function ClassInfo(){
    return(
        <AdminCardContainer className="admin-class-info">
            <header className="info-header">
                <h1 className = "admin-card-heading">Class Info</h1>
            </header>
        </AdminCardContainer>
    )
}