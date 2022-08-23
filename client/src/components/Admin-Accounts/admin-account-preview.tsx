import { ClassSchema } from "@shared/School";
import { Gender, Student, Teacher } from "@shared/User";
import { getAdminClasses } from "api/admin/admin-classes";
import { updateStudent, updateTeacher } from "api/admin/admin-manage-users";
import { approveStudent, rejectStudent } from "api/admin/admin-requests";
import Avatar from "components/Avatar/avatar"
import { toastError, toastSuccess } from "components/Toast/toast";
import AdminCardContainer from "container/Admin-Cards/admin-card";
import React, { useEffect, useState } from "react";
import { Classes } from "react-modal";
import { useLocation } from "react-router-dom"
import { User } from "types/user"
import "./preview.scss"

export default function AdminAccountPreview({onTaskComplete, manageUser}: {onTaskComplete?: (user: User)=>void, manageUser?: boolean}){
    const _user = useLocation().state as Student;
    const [user, setUser] = useState(_user);
    const [loading, setLoading] = useState(false);
    const saveChanges = async() => {
        if(loading) return;
        setLoading(true);
        const res = _user.class_id?await updateStudent(user):await updateTeacher(user as any);
        setLoading(false);
        if(res.error) return toastError(res.message);
        toastSuccess("Successfully Saved User")
        window.history.replaceState(user, document.title)
        onTaskComplete?.(user);
    }
    const accept = async() => {
        if(window.confirm("Are you sure you want to accept?")){
            const res = await approveStudent(user);
            if(res.error) return toastError(res.message);
            setUser({} as Student)
            window.history.replaceState({}, document.title)
            onTaskComplete?.(user);
        }
    }
    const reject = async() => {
        if(window.confirm("Are you sure you want to accept?")){
            const res = await rejectStudent(user.user_id);
            if(res.error) return toastError(res.message);
            setUser({} as Student)
            window.history.replaceState({}, document.title)
            onTaskComplete?.(user);
        }
    }
    useEffect(()=>{
        setUser(_user)
    }, [_user])
    if(!user.user_id) return <></>;
    return(
        <AdminCardContainer className="admin-account-preview">
            <header className="account-preview-header">
                <Avatar size={80} src = {user.profile_picture_url} />
            </header>
            <InfoTitle>USER INFO</InfoTitle>
            <KeyValue keyName = "Name" value = {user.full_name} onChange = {full_name=>setUser({...user, full_name})} />
            <KeyValue keyName = "Email" value = {user.email} onChange = {email=>setUser({...user, email})} />
            {user.class_id && <KeyValueClasses keyName = "Class" value = {user.class_id} onChange = {class_id=>setUser({...user, class_id})} />}
            <KeyValueGender keyName = "Gender" value = {user.gender} onChange = {gender=>setUser({...user, gender: gender as Gender})} />
            {
                user.class_id && (
                    <>
                        <InfoTitle>PARENTS INFO</InfoTitle>
                        <KeyValue keyName = "Mother's email" value = {user.mothers_email} onChange = {mothers_email=>setUser({...user, mothers_email})} />
                        <KeyValue keyName = "Father's email" value = {user.fathers_email} onChange = {fathers_email=>setUser({...user, fathers_email})}/>
                    </>
                )
            }
            {manageUser?<SaveButton onSave={saveChanges} isLoading = {loading} />:<ApprovalButtons onAccept={accept} onReject={reject} />}
        </AdminCardContainer>
    )
    
}

function InfoTitle({children}: {children: React.ReactNode}){
    return(
        <div className="account-preview-info-title">{children}</div>
    )
}

interface KeyValueProps {
    keyName: string,
    value: string,
    onChange: (text: string) => void;
}

function KeyValue({
    keyName,
    value,
    onChange
}: KeyValueProps){
   
    return(
        <div className="account-preview-key-value">
            <span className="key">{keyName}:</span>

            <input placeholder={keyName} value={value} onChange = {(e)=>onChange(e.target.value)} />

        </div>
    )
}
interface KeyValuePropsClasses {
    keyName: string,
    value: string,
    onChange: (text: string) => void;
}
function KeyValueClasses({
    keyName, 
    value,
    onChange
}: KeyValuePropsClasses){
    const [classes, setClasses] = useState<ClassSchema[]>([])
    useEffect(()=>{
        getAdminClasses().then(x=>{
            if(x.error) return toastError("Error while fetching classes");
            setClasses(x.data);
        })
    }, [])
    return(
        <div className="account-preview-key-value">
            <span className="key">{keyName}:</span>
            <select value = {value} onChange = {(e)=>onChange(e.target.value)}>
                {
                    classes.map((x, i)=><option value={x.class_id} key = {i}>{x.grade} {x.section}</option>)
                }
                
            </select>
        </div>
    )
}

function KeyValueGender({
    keyName,
    value,
    onChange
}:KeyValuePropsClasses){
    return(
        <div className="account-preview-key-value">
        <span className="key">{keyName}:</span>
        <select value = {value} onChange = {(e)=>onChange(e.target.value)}>
            <option value = "Male">Male</option>
            <option value = "Female">Female</option>
        </select>
    </div>
    )
}

function ApprovalButtons({
    onReject,
    onAccept
}: {onReject: ()=>void, onAccept: ()=>void}){
    return(
        <div className = "admin-approval-buttons-container">
            <button className = "reject" onClick={onReject}>REJECT</button>
            <button className = "accept" onClick = {onAccept}>ACCEPT</button>
        </div>
    )
}

function SaveButton({
    onSave,
    isLoading
}: {onSave: ()=>void, isLoading: boolean}){
    return(
        <button className = "admin-update-user-button" onClick={onSave} disabled = {isLoading}>{isLoading?"loading...":"SAVE"}</button>
    )
}