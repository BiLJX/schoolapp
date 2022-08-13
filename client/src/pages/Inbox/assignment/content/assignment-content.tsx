import { Assignment } from "@shared/Assignment";
import { Student } from "@shared/User";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteAssignment, getAssignmentById, getPendingStudents, getRedoStudents, getSubmittedStudents } from "api/assignment";
import Avatar from "components/Avatar/avatar";
import { InformationError, NotFound } from "components/Error/error-component";
import MobileStackHeader from "components/header/mobile-header";
import { toastError } from "components/Toast/toast";
import StackContainer from "container/mobile-layouts/stack-container";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, Router, Routes, useNavigate, useParams } from "react-router-dom";
import { RootState } from "types/states";
import "./content.scss";
import ReactModal from "react-modal";
import { User } from "types/user";
export default function AssignmentContent(){
    const { id } = useParams();
    const currentUser = useSelector((state: RootState) => state.currentUser) as User;
    const [loading, setLoading] = useState(true);
    const [assignment, setAssignment] = useState<Assignment>();
    const [submittedStudents, setSubmittedStudents] = useState<Student[]>();
    const [redoStudents, setRedoStudents] = useState<Student[]>();
    const [pendingStudents, setPendingStudents] = useState<Student[]>();
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const isUploader = currentUser.user_id === assignment?.assigned_by;
    const getStudents = async() => {
        if(!id) return;
        getSubmittedStudents(id).then((x)=>{
            if(x.error) return toastError(x.message);
            setSubmittedStudents(x.data);
        })
        getPendingStudents(id).then((x)=>{
            if(x.error) return toastError(x.message);
            setPendingStudents(x.data);
        })
        getRedoStudents(id).then((x)=>{
            if(x.error) return toastError(x.message);
            setRedoStudents(x.data);
        })
    }
    const fetchInfo = async () => {
        if(!id) return toastError("Error 404")
        const res = await getAssignmentById(id);
        getStudents();
        if(res.error){
            setLoading(false);
            return toastError(res.message);
        }
        setAssignment(res.data);
        setLoading(false);
    }
    useEffect(()=>{
        if(!id) return;
        fetchInfo();
    }, [id])

    let Content: JSX.Element;
    if(loading) Content = <></>;
    else if(!assignment) Content = <NotFound title="Assignment not found :(" />
    else Content = (
        <>
            <AssignmentOptions isOpen = {isOptionsOpen} assignmentId = {assignment.assignment_id} onClose = {()=>setIsOptionsOpen(false)} />
            <div className = "assignment-content-info">
                <div className = "assignment-content-info-item assignment-content-info-header">
                    <h2 className="assignment-content-info-title">{assignment.title}</h2>
                    {isUploader && (<div className = "more-icon" onClick = {()=>setIsOptionsOpen(true)}><MoreVertIcon /></div>)}
                </div>
                
                <p className = "assignment-content-info-item assignment-content-info-desc">{assignment.description}</p>
                <div className="assignment-content-info-item assignment-content-info-points">Points: {assignment.points}</div>
                {assignment.status && <div className="assignment-content-info-item assignment-content-info-status">Status:<span className={assignment.status}>{assignment.status}</span></div>}
                <div className="assignment-content-info-item assignment-content-info-due">Due: {moment(assignment.due).format("MMMM Do YYYY")}</div>
            </div>
            <Nav />
            <Routes>
                <Route index element = {<StudentContainer data = {submittedStudents} errMsg = "No students have submitted :(" />} />
                <Route path = "pending" element = {<StudentContainer data = {pendingStudents} errMsg = "All students have submitted :)" />} />
                <Route path = "redo" element = {<StudentContainer data = {redoStudents} errMsg = "No students have to redo :)"/>} />
            </Routes>
            {isUploader && <ChangeStatus />}
        </>
    )
    return(
        <>
            
            <MobileStackHeader goBack label = "Assignment" />
            <StackContainer style={{position: "relative", paddingBottom: isUploader?"90px":"0" }}>
               {Content}
            </StackContainer>
        </>
    )
}


function StudentContainer({data, errMsg}: {data: Student[]|undefined, errMsg: string}){
    if(!data) return <></>;
    if(data.length === 0) return <InformationError title={errMsg} />
    return(
        <div className = "assignment-content-student-container">
            {
                data.map((x, i)=>(
                    <div className ="assignment-content-student-item" key = {i}>
                        <Avatar size={30} src = {x.profile_picture_url} />
                        <span className = "assignment-content-student-name">{x.full_name}</span>
                    </div>
                ))
            }
        </div>
    )
}


function Nav(){
    return(
        <nav className="assignment-content-nav">
            <NavLink to = "" replace className="assignment-content-nav-item" end>Submitted</NavLink>
            <NavLink to = "pending" replace className="assignment-content-nav-item">Pending</NavLink>
            <NavLink to = "redo" replace className="assignment-content-nav-item">Redo</NavLink>
        </nav>
    )
}

function ChangeStatus(){
    const navigate = useNavigate();
    return(
        <div className = "assignment-change-status-button">
            <button onClick={()=>navigate("students")}>Change Status</button>
        </div>
    )
}

interface AssignmentOptionsProps {
    isOpen: boolean,
    assignmentId: string,
    onClose: () => any
}
export function AssignmentOptions(props: AssignmentOptionsProps){
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const onDelete = async() => {
        if(isDeleting) return;
        if(!window.confirm("Are you sure you want to delete?")) return;
        setIsDeleting(true);
        const res = await deleteAssignment(props.assignmentId);
        if(res.error){
            setIsDeleting(false)
            return toastError(res.message);
        }
        setIsDeleting(false)
        props.onClose();
        navigate(-1);
    }
    return(
        <ReactModal onRequestClose={props.onClose} preventScroll shouldCloseOnOverlayClick isOpen = {props.isOpen} overlayClassName = "modal-overlay" className="assignment-options">
            <div className = "assignment-options-item" style={{color: "var(--blue)"}} onClick = {()=>navigate("students")}>Change students status</div>
            <div className = "assignment-options-item" style={{color: "var(--red)"}} onClick = {onDelete}>{isDeleting?"Deleting...":"Delete"}</div>
            <div className = "assignment-options-item" onClick = {props.onClose}>Cancel</div>
        </ReactModal>
    )
}