import { useId } from "react";
import AssignmentItem from "./assignment-item"
import MobileStackHeader from "components/header/mobile-header";
import StackContainer from "container/mobile-layouts/stack-container";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./assignment.scss";
export default function AssignmentsPage(){
    return(
        <>
            <MobileStackHeader label = "Assignments" goBack />
            <StackContainer className = "assignments-page">
                <div className = "assignment-filter-container">
                    <AssignmentFilter />
                </div>
                <ItemsContainer />
            </StackContainer>
        </>
    )
}

function ItemsContainer(){
    return(
        <div className = "assignment-items-container">
            <div className = "assignment-date">July 21, 2022</div>
            <AssignmentItem />
            <AssignmentItem />
            <AssignmentItem />
            <AssignmentItem />
            <AssignmentItem />
        </div>
    )
}


function AssignmentFilter(){
    const select_id = useId()
    return(
        <div className="assignment-filter">
            <select id = {select_id}>
                <option>All</option>
                <option>Not Done</option>
                <option>Redo</option>
                <option>Completed</option>
            </select>
            <label htmlFor={select_id} className = "select-icon">
                <ArrowDropDownIcon />
            </label>
        </div>
    )
}