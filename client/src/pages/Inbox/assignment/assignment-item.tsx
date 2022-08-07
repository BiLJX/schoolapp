import { Assignment } from "@shared/Assignment";
import moment from "moment";
import { NavLink } from "react-router-dom";
import "./item.scss";

export default function AssignmentItem({assignment}: {assignment: Assignment}){
    let Status: JSX.Element;
    if(assignment.status === "completed") Status = <div className = "assignment-item-status completed">Completed</div>
    else if(assignment.status === "redo") Status = <div className = "assignment-item-status redo">Redo</div>
    else Status = <div className = "assignment-item-status pending">Pending</div>
    return(
        <NavLink className="assignment-item" to = {assignment.assignment_id}>
            <div className = "assignment-item-top">
                <span>{assignment.title}</span>
                {Status}
            </div>
            <div className = "assignment-item-description">{assignment.description}</div>
            <div className = "assignment-item-due">To submit: {moment(assignment.due).format("MMMM Do YYYY") }</div>
        </NavLink>
    )
}