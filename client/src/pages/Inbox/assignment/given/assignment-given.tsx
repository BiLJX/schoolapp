import { useEffect, useId, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Assignment, AssignmentFeed } from "@shared/Assignment";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { toastError } from "components/Toast/toast";
import { getGivenAssignments } from "api/assignment";
import MobileStackHeader from "components/header/mobile-header";
import StackContainer from "container/mobile-layouts/stack-container";
import { ClassSchema } from "@shared/School";
import { useSelector } from "react-redux";
import { RootState } from "types/states";
import { Teacher } from "@shared/User";
import { getClasses } from "api/schools";

export default function AssignmentGivenPage(){
    const [filter, setFilter] = useState<string>("all");
    const [assignments, setAssignments] = useState<AssignmentFeed[]>([]);
    const fetchAssignments = async() => {
        const res = await getGivenAssignments();
        if(res.error){
            return toastError(res.message);
        }
        setAssignments(res.data);
    }
    useEffect(()=>{
        fetchAssignments();
    }, [filter])   
    return(
        <>
            <MobileStackHeader label = "Given Assignments" goBack />
            <StackContainer className = "assignments-page">
                {
                    assignments.map((x, i)=><ItemsContainer data = {x} key = {i} />)
                }
            </StackContainer>
        </>
    )
}



function ItemsContainer({data}: {data: AssignmentFeed}){
    return(
        <div className = "assignment-items-container">
            <div className = "assignment-date">{data.given_on}</div>
            {
                data.assignments.map((x, i)=><AssignmentItem assignment={x} key = {i} />)
            }
        </div>
    )
}

export function AssignmentItem({assignment}: {assignment: Assignment}){
    return(
        <NavLink className="assignment-item" to = {assignment.assignment_id}>
            <div className = "assignment-item-top" style={{marginBottom: ".5rem"}}>
                <span>{assignment.title}</span>
            </div>
            <div className = "assignment-item-description">{assignment.description}</div>
            <div className = "assignment-item-due">To submit: {moment(assignment.due).format("MMMM Do YYYY") }</div>
        </NavLink>
    )
}


// function AssignmentFilter({onChange}: {onChange: (val: string)=>any;}){
//     const select_id = useId();
//     const [data, setData] = useState<ClassSchema[]>([]);
//     const { school_id } = useSelector((state: RootState)=>state.currentUser) as Teacher;
//     const fetchClasses = async() => {
//         const res = await getClasses(school_id);
//         if(res.error){
//             return toastError("Error while fetching classes");
//         }
//         setData(res.data);
//     }
//     useEffect(()=>{
//         fetchClasses();
//     }, [])
//     return(
//         <div className="assignment-filter">
//             <select onChange={(e)=>onChange(e.target.value )} id = {select_id}>
//                 <option value="all">All</option>
//                 {
//                     data.map((x, i)=><option key = {i} value = {x.class_id}>Class {x}</option>)
//                 }
//             </select>
//             <label htmlFor={select_id} className = "select-icon">
//                 <ArrowDropDownIcon />
//             </label>
//         </div>
//     )
// }