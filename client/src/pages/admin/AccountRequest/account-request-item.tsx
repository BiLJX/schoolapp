import { ClassSchema } from "@shared/School"
import { Student, Teacher } from "@shared/User";
import { AdminRequests } from "api/admin/admin";
import { FormSelectData, SimpleSelect } from "components/form/FormComponents";
import { toastError } from "components/Toast/toast";
import { useState } from "react"
import "./account-request-item.scss"

interface Props {
    classes: FormSelectData[],
    user: Student|Teacher 
}
export function AccountRequestItem({classes, user}: Props){
    const [userClass, setUserClass] = useState( "class_id" in user?user.class_id:null);
    const [isHidden, setIsHidden] = useState(false);
    const approveRequest = async() => {
        if(!window.confirm("Are you sure you want to confirm?")) return;
        setIsHidden(true);
        let res: ApiResponse;
        if("class_id" in user && userClass){
            res = await AdminRequests.approveStudent(user.user_id, userClass)
        }else {
            res = await AdminRequests.approveTeacher(user.user_id);
        }
        if(res.error){
            setIsHidden(false);
            toastError(res.message)
        }
    }
    const rejectRequest = async() => {
        if(!window.confirm("Are you sure you want to reject?")) return;
        setIsHidden(true);
        let res: ApiResponse; 
        if("class_id" in user && userClass){
            res = await AdminRequests.rejectStudent(user.user_id)
        }else {
            res = await AdminRequests.rejectTeacher(user.user_id);
        }
        if(res.error){
            setIsHidden(false);
            toastError(res.message)
        }
    }
    if(isHidden) return <></>
    return(
        <div className = "account-request-item">
            <div className = "pfp">
                <img src = {user.profile_picture_url} className="full-img" />
            </div>
            <div className="info">
                <div className = "info-item"><b style = {{ marginRight: "0.5rem" }}>Name:</b>{user.full_name}</div>
                {userClass && <div className = "info-item"><b style = {{ marginRight: "0.5rem" }}>Class:</b> <SimpleSelect onChange={setUserClass} value={userClass} data = {classes} style = {{flex: "1", marginRight: "0.5rem"}} /> </div>}
                <div className = "info-item"><b style = {{ marginRight: "0.5rem" }}>Email:</b>{user.email}</div>
                <div className = "info-item"><b style = {{ marginRight: "0.5rem" }}>Type:</b>{"class_id" in user?"Student":"Teacher"}</div>
                <div className = "button-container">
                    <button className = "button accept" onClick={approveRequest}>Accept</button>
                    <button className = "button reject" onClick={rejectRequest}>Reject</button>
                </div>
            </div>
        </div>
    )
}