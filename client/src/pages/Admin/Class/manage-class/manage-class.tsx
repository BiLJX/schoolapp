import AdminHeader from "components/header/admin-header/admin-header";
import AdminCardContainer from "container/Admin-Cards/admin-card";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import "./manage.scss";
import React, { useEffect, useState } from "react";
import { Student } from "@shared/User";
import { editClass, getAdminClassById, getAdminClassStudents } from "api/admin/admin-classes";
import { useParams } from "react-router-dom";
import { toastError } from "components/Toast/toast";
import Avatar from "components/Avatar/avatar";
import { InformationError } from "components/Error/error-component";
import { ClassInfo } from "@shared/School";

export default function ManageClassPage(){
    return(
        <>
            <AdminHeader title="Class" sub_title="Manage Individual Classes" />
            <AdminMain className="manage-class-container">
                <StudentsContainer />
                <ClassInfoCompomenent />
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

function ClassInfoCompomenent(){
    const class_id = useParams().class_id
    const [data, setData] = useState<ClassInfo>();
    const [temp, setTemp] = useState<ClassInfo>()
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const save = async() => {
        if(!data) return;
        setIsSaving(true);
        setIsButtonDisabled(true);
        const res = await editClass({grade: data.grade, class_id: data.class_id, section: data.section});
        setIsSaving(false);
        setIsButtonDisabled(false);
        if(res.error){
            return toastError(res.message)
        }
        setTemp(data);
    }

    useEffect(()=>{
        const fetchClass = async() => {
            if(!class_id) return;
            const res = await getAdminClassById(class_id);
            if(res.error) return toastError(res.message);
            setData(res.data);
            setTemp(res.data)
        }
        fetchClass()
    }, [])
    useEffect(()=>{
        if(!temp) return;
        setIsButtonDisabled(temp.section === data?.section && temp.grade === data.grade)
    }, [data, temp])
    return(
        <AdminCardContainer className="admin-class-info">
            <header className="info-header">
                <h1 className = "admin-card-heading">Class Info</h1>
            </header>
            <InfoTitle>INFO</InfoTitle>

            <KeyValue keyName="Section" value={data?.section||""} onChange = {text=>data && setData({...data, section: text})} />
            <KeyValue keyName="Grade" value={data?.grade||""} onChange = {(text)=>data && setData({...data, grade: parseInt(text)})} />

            <InfoTitle>STATS</InfoTitle>

            <KeyValue keyName="Students" value={data?.total_students||""} />
            <KeyValue keyName="Male" value={data?.total_males||""} />
            <KeyValue keyName="Female" value={data?.total_females||""} />

            <button className = "admin-class-info-save-button" onClick={save} disabled = {isButtonDisabled}>{isSaving?"SAVING":"SAVE"}</button>
        </AdminCardContainer>
    )
}

function InfoTitle({children}: {children: React.ReactNode}){
    return(
        <div className="info-title">{children}</div>
    )
}
interface KeyValueProps {
    keyName: string,
    value: string|number,
    onChange?: (text: string) => void;
}

function KeyValue({
    keyName,
    value,
    onChange
}: KeyValueProps){
    return(
        <div className="class-info-key-value">
            <span className="key">{keyName}:</span>
            <input type={typeof value === "number"?"number":"text"} placeholder={keyName} value={value} onChange = {(e)=>onChange?.(e.target.value)} disabled = {onChange?false:true} />
        </div>
    )
}