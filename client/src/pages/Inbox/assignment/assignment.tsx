import { useEffect, useId, useState } from "react";
import AssignmentItem from "./assignment-item"
import MobileStackHeader from "components/header/mobile-header";
import StackContainer from "container/mobile-layouts/stack-container";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./assignment.scss";
import { getStudentsAssignment } from "api/assignment";
import { AssignmentFeed, AssignmentStatus } from "@shared/Assignment";
import { toastError } from "components/Toast/toast";
export default function AssignmentsPage(){
    const [assignments, setAssignments] = useState<AssignmentFeed[]>([]);
    const [filter, setFilter] = useState<AssignmentStatus|"all">("all");
    const fetchAssignments = async() => {
        const res = await getStudentsAssignment(filter);
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
            <MobileStackHeader label = "Assignments" goBack />
            <StackContainer className = "assignments-page">
                <div className = "assignment-filter-container">
                    <AssignmentFilter onChange={(val)=>setFilter(val)} />
                </div>
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


function AssignmentFilter({onChange}: {onChange: (val: AssignmentStatus|"all")=>any;}){
    const select_id = useId()
    return(
        <div className="assignment-filter">
            <select onChange={(e)=>onChange(e.target.value as AssignmentStatus)} id = {select_id}>
                <option value="all">All</option>
                <option value = "pending">Not Done</option>
                <option value = "redo">Redo</option>
                <option value = "completed">Completed</option>
            </select>
            <label htmlFor={select_id} className = "select-icon">
                <ArrowDropDownIcon />
            </label>
        </div>
    )
}