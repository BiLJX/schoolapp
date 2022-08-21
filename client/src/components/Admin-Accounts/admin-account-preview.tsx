import { ClassSchema } from "@shared/School";
import { Student } from "@shared/User";
import { getAdminClasses } from "api/admin/admin-classes";
import Avatar from "components/Avatar/avatar"
import { toastError } from "components/Toast/toast";
import AdminCardContainer from "container/Admin-Cards/admin-card";
import React, { useEffect, useState } from "react";
import { Classes } from "react-modal";
import { useLocation } from "react-router-dom"
import { User } from "types/user"
import "./preview.scss"

export default function AdminAccountPreview(){
    const user = useLocation().state as Student;
    
    if(!user) return <></>;
    return(
        <AdminCardContainer className="admin-account-preview">
            <header className="account-preview-header">
                <Avatar size={80} src = {user.profile_picture_url} />
            </header>
            <InfoTitle>USER INFO</InfoTitle>
            <KeyValue keyName = "Name" value = {user.full_name} />
            <KeyValue keyName = "Email" value = {user.email} />
            <KeyValue isSelect keyName = "Class" value = {user.class_id} />
            <KeyValue keyName = "Gender" value = "Male" />
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
    isSelect?: boolean 
}
function KeyValue({
    keyName,
    value,
    isSelect
}: KeyValueProps){
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
            {!isSelect?(
                <input placeholder={keyName} value={value} />
            ):(
                <select value = {value}>
                    {
                        classes.map((x, i)=><option value={x.class_id} key = {i}>{x.grade} {x.section}</option>)
                    }
                    
                </select>
            )}
        </div>
    )
}