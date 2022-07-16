import { ClassSchema } from "@shared/School"
import { Student } from "@shared/User";
import { AdminUser } from "api/admin/admin";
import { FormSelectData, SimpleSelect } from "components/form/FormComponents";
import { toastError } from "components/Toast/toast";
import { useState } from "react"
import "./account-request-item.scss"

interface Props {
    classes: FormSelectData[],
    student: Student 
}
export function AccountRequestItem({classes, student}: Props){
    const [userClass, setUserClass] = useState(student.class_id);
    const [isHidden, setIsHidden] = useState(false);
    const approveRequest = async() => {
        setIsHidden(true);
        const res = await AdminUser.approveStudent(student.user_id, userClass);
        if(res.error){
            setIsHidden(false);
            toastError(res.message)
        }
    }
    if(isHidden) return <></>
    return(
        <div className = "account-request-item">
            <div className = "pfp">
                <img src = {student.profile_picture_url} className="full-img" />
            </div>
            <div className="info">
                <div className = "info-item"><b style = {{ marginRight: "0.5rem" }}>Name:</b>{student.full_name}</div>
                <div className = "info-item"><b style = {{ marginRight: "0.5rem" }}>Class:</b> <SimpleSelect onChange={setUserClass} value={userClass} data = {classes} style = {{flex: "1", marginRight: "0.5rem"}} /> </div>
                <div className = "info-item"><b style = {{ marginRight: "0.5rem" }}>Email:</b>{student.email}</div>
                <div className = "button-container">
                    <button className = "button accept" onClick={approveRequest}>Accept</button>
                    <button className = "button reject">Reject</button>
                </div>
            </div>
        </div>
    )
}