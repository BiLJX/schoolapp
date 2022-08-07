import { Assignment } from "@shared/Assignment";
import { getAssignmentById } from "api/assignment";
import { NotFound } from "components/Error/error-component";
import MobileStackHeader from "components/header/mobile-header";
import { toastError } from "components/Toast/toast";
import StackContainer from "container/mobile-layouts/stack-container";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./content.scss";
export default function AssignmentContent(){
    const [assignment, setAssignment] = useState<Assignment>();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    let Content: JSX.Element;
    const fetchInfo = async () => {
        if(!id) return toastError("Error 404")
        const res = await getAssignmentById(id);
        if(res.error){
            setLoading(false);
            return toastError(res.message);
        }
        setAssignment(res.data);
        setLoading(false);
    }
    useEffect(()=>{
        fetchInfo()
    }, [])
    if(loading) Content = <></>;
    else if(!assignment) Content = <NotFound title="Assignment not found :(" />
    else Content = (
        <>
            <div className = "assignment-content-info">
                <h2 className="assignment-content-info-item assignment-content-info-title">{assignment.title}</h2>
                <p className = "assignment-content-info-item assignment-content-info-desc">{assignment.description}</p>
                <div className="assignment-content-info-item assignment-content-info-points">Points: {assignment.points}</div>
                <div className="assignment-content-info-item assignment-content-info-status">Status:<span className={assignment.status}>{assignment.status}</span></div>
                <div className="assignment-content-info-item assignment-content-info-due">Due: {moment(assignment.due).format("MMMM Do YYYY")}</div>
            </div>
            <Nav />
        </>
    )
    return(
        <>
            <MobileStackHeader goBack label = "Assignment" />
            <StackContainer>
               {Content}
            </StackContainer>
        </>
    )
}


function Nav(){
    return(
        <nav className="assignment-content-nav">
            <NavLink to = "" className="assignment-content-nav-item" end>Submitted</NavLink>
            <NavLink to = "pending" className="assignment-content-nav-item">Pending</NavLink>
            <NavLink to = "redo" className="assignment-content-nav-item">Redo</NavLink>
        </nav>
    )
}