import { Student } from "@shared/User"
import Avatar from "components/Avatar/avatar"

export function ItemLabelsStudent(){
    return(
        <div className="admin-manage-user-item-label">
            <div className = "item-label" style = {{width: "45px"}} />
            <div className = "item-label" style={{width: "30%"}}>Name</div>
            <div className = "item-label" style={{width: "15%"}}>Class</div>
            <div className = "item-label" style={{width: "20%"}}>Section</div>
            <div className = "item-label" style={{width: "15%"}}>Gender</div>
            <div className = "item-label">ID</div>
        </div>
    )
}

export function StudentItem({student}: {student: Student}){
    return(
        <div className="admin-manage-user-item">
            <Avatar src = {student.profile_picture_url} size = {35} style = {{ borderRadius: "5px", marginRight: "15px" }} />
            <div className = "item-label" style={{width: "30%", color: "var(--text-title"}}>{student.full_name}</div>
            <div className = "item-label" style={{width: "15%"}}>{student.class.grade}</div>
            <div className = "item-label" style={{width: "20%"}}>{student.class.section}</div>
            <div className = "item-label" style={{width: "15%"}}>{student.gender}</div>
            <div className = "item-label">{student.user_id}</div>
        </div>
    )
}
