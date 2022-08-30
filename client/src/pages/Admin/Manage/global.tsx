import { FormInput, FormSelect, FormSelectData } from "components/form/FormComponents"
import ReactModal from "react-modal"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import WcIcon from '@mui/icons-material/Wc';
import { useEffect, useId, useState } from "react";
import { Gender, StudentSignupData, UserSignupData } from "@shared/User";
import { ClassSchema } from "@shared/School";
import { getAdminClasses } from "api/admin/admin-classes";
import { toastError } from "components/Toast/toast";
import Avatar from "components/Avatar/avatar";
import { createStudent, createTeacher } from "api/admin/admin-manage-users";
import { User } from "types/user";
export function CreateUserButton({onClick}:{onClick: ()=>void}){
    return(
        <div className="create-user-button-container">
            <button onClick={onClick}>Create</button>
        </div>
    )
}

interface ModalProps {
    type: "teacher"|"student",
    onClose: ()=>void,
    onComplete: (user: User) => void
}
export function CreateUserModal({
    type,
    onClose,
    onComplete
}: ModalProps){
    const input_id = useId();
    const [image, setImage] = useState<File>();
    const [isCreating, setIsCreating] = useState(false)
    const [imageUrl, setImageUrl] = useState("");
    const [classes, setClasses] = useState<FormSelectData[]>([{label: "Class", value: "null"}]);
    const [signupData, setSignupData] = useState<UserSignupData>({
        full_name: "",
        email: "",
        password: "",
        school_id: "",
        class_id: "",
        gender: "null",
        mothers_email: "",
        fathers_email: ""
    });
    const closeModal = (e: any) => {
        e.preventDefault(); 
        if(window.confirm("Are you sure you want to close?")) onClose();
    }
    const submit = async(e: any) => {
        e.preventDefault(); 
        if(isCreating) return;
        if(!image) return toastError("Please upload a pfp.");
        if(signupData.gender === "null") return toastError("Please select gender");
        setIsCreating(true);
        const res = type === "student"?await createStudent(signupData, image):await createTeacher(signupData, image);
        setIsCreating(false);
        if(res.error){
            return toastError(res.message);
        }
        onComplete(res.data);
        onClose();
    }
    useEffect(()=>{
        if(type === "student") getAdminClasses().then(res=>{
            if(res.error) return toastError("Error while fetching classes.");
            setClasses([classes[0], ...res.data.map(x=>({
                label: `Class ${x.grade} ${x.section}`,
                value: x.class_id
            }))]);
        })
    }, [])
    return(
        <ReactModal overlayClassName="modal-overlay create-user-modal-overlay" className="create-user-modal" isOpen>
            <form style={{display: "flex", flexDirection: "column"}} onSubmit = {submit}>
                <div className = "center" style={{width: "100%", padding: "1rem 0", position: "relative"}}>
                    <Avatar src = {imageUrl} size={100} />
                    <input id = {input_id} type = "file" accept = "image/*" hidden onChange={(e: any)=>{
                        if(!e.target.files[0]) return;
                        const image_url = URL.createObjectURL(e.target.files[0]);
                        setImageUrl(image_url);
                        setImage(e.target.files[0])
                    }} />
                    <label htmlFor={input_id} className = "create-user-pfp-edit-icon" >
                        <EditOutlinedIcon />
                    </label>
                </div>
                <FormInput Icon={PersonOutlineOutlinedIcon} placeholder = "Full Name" onChange={(val)=>setSignupData({...signupData, full_name: val })} />
                <FormInput Icon={AlternateEmailOutlinedIcon} placeholder = "Email" onChange={(val)=>setSignupData({...signupData, email: val })} />
                <FormInput Icon = {VpnKeyOutlinedIcon} placeholder = "Password" type="password" onChange={(val)=>setSignupData({...signupData, password: val })} />
                {type === "student" && <FormSelect Icon={GroupsOutlinedIcon} data = {classes} onChange={(val)=>setSignupData({...signupData, class_id: val })} />}
                <FormSelect Icon={WcIcon} data = {[{label: "Gender", value: "null"}, {label: "Male", value: "Male"}, {label: "Female", value: "Female"}]} onChange={(val)=>setSignupData({...signupData, gender: val as Gender })} />
                {type === "student" && <FormInput Icon = {AlternateEmailOutlinedIcon} placeholder = "Mother's Email" onChange={(val)=>setSignupData({...signupData, mothers_email: val })} />}
                {type === "student" && <FormInput Icon = {AlternateEmailOutlinedIcon} placeholder = "Father's Email" onChange={(val)=>setSignupData({...signupData, fathers_email: val })} />}
                <div className = "create-user-modal-buttons">
                    <button className="cancel" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="accept" disabled = {isCreating}>{isCreating?"Creating...":"Create"}</button>
                </div>
            </form>
        </ReactModal>
    )
}
