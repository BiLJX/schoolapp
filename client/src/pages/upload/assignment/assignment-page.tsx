import MobileStackHeader from "components/header/mobile-header";
import StackContainer from "container/mobile-layouts/stack-container";
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import ReactTextareaAutosize from "react-textarea-autosize";
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { FormSubmit } from "components/form/FormComponents";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "types/states";
import { UploadAssignmentActions } from "redux/UploadAssignment/uploadAssignmentActions";
import { createAssignment } from "api/assignment"
import "../scss/upload-assignment.scss"
import { useState } from "react";
import { toastError } from "components/Toast/toast";


const getTomorrowsData = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0]
}

export default function UploadAssignment(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const assignmentData = useSelector((state: RootState)=>state.uploadAssignmentData);
    const assignedClass = assignmentData.assigned_to.map(x=>`${x.grade} ${x.section}`).join(", ")
    const [isLoading, setIsLoading] = useState(false);
    const create = async(e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await createAssignment(assignmentData);
        if(res.error){
            toastError(res.message);
            return setIsLoading(false);
        }
        setIsLoading(false);
        dispatch(UploadAssignmentActions.clear());
        navigate("/");
    }
    return(
        <>
            <MobileStackHeader label = "Upload an Assignment" goBack />
            <StackContainer>
                <form className = "upload-assignment-form" onSubmit={create}>
                    <FormInput 
                    value = {assignmentData.title || ""} 
                    placeholder="Title" Icon={TitleOutlinedIcon} 
                    onChange = {(text)=>dispatch(UploadAssignmentActions.changeAssignmentTitle(text))} />
                    
                    <FormTextArea 
                    value = {assignmentData.description || ""} 
                    placeholder="Describe homework..." 
                    Icon={AssignmentOutlinedIcon} 
                    onChange = {(text)=>dispatch(UploadAssignmentActions.changeAssignmentDescription(text))} />
                    
                    <FormInput 
                    value = {assignmentData.due || ""} 
                    placeholder="Due" Icon={CalendarMonthOutlinedIcon} 
                    type = "date" 
                    onChange = {(date)=>dispatch(UploadAssignmentActions.changeAssignmentDue(date))} 
                    min = {getTomorrowsData()}
                    />
                    
                    <FormInput 
                    value = {assignmentData.points + ""|| ""} 
                    placeholder="Points" Icon={StarOutlineOutlinedIcon} 
                    type = "number" 
                    onChange = {(data)=>dispatch(UploadAssignmentActions.addPoints(parseInt(data)))} 
                    min = "1"
                    max = "10"
                    />
                    

                    <div className = "form-input-container" onClick={()=>navigate("assign")}>
                        <div className = "icon-container">
                            <GroupAddOutlinedIcon />
                        </div>
                        <div className = "input-container">
                            <input disabled placeholder="Assign to..." value = {assignedClass} />
                        </div>
                    </div>
                    <FormSubmit className="upload-assignment-submit" label="Upload" isLoading = {isLoading} />
                </form>
            </StackContainer>
        </>
    )
}

interface FormInputProps {
    className?: string,
    onChange?: (val: string) => any;
    Icon: any;
    placeholder: string,
    type?: string,
    value: string,
    min?: string,
    max?: string
}

function FormInput({
    className, 
    Icon, 
    onChange, 
    placeholder, 
    type,
    value,
    min,
    max
}: FormInputProps){
    return(
        <div className = {`form-input-container ${className || ""}`}>
            <div className = "icon-container">
                <Icon />
            </div>
            <div className = "input-container">
                <input placeholder={placeholder} min = {min} max = {max} value = {value} type={type || "text"} onChange={(e)=>onChange?.(e.target.value)} />
            </div>
        </div>
    )
}

interface FormTextAreatProps {
    className?: string,
    onChange?: (text: string) => any;
    Icon: any;
    placeholder: string,
    value: string
}

function FormTextArea({
    className, 
    Icon, 
    onChange, 
    placeholder,
    value
}: FormTextAreatProps){
    return(
        <div className = {`form-input-container ${className || ""}`}>
            <div className = "icon-container">
                <Icon />
            </div>
            <div className = "input-container">
                <ReactTextareaAutosize value = {value} placeholder={placeholder} minRows={3} onChange={(e)=>onChange?.(e.target.value)} />
            </div>
        </div>
    )
}