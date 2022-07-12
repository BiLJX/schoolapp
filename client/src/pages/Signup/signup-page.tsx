import { FormInput, FormSelect, FormSelectData, FormSubmit } from "components/form/FormComponents"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import "./signup.scss"
import { useState } from "react";


export default function SignupUpPage(){
    const [school, setSchool] = useState<FormSelectData[]>([{label: "School", value: "null"},{label: "Euro School", value: "aa"}])
    const [grade, setGrade] = useState<FormSelectData[]>([{label: "Class", value: "null"},{label: "10 (Newton)", value: "10"}])
    
    return(
        <div className = "auth-container">
           
            <form className="auth-form-container">
                <div className = "profile-picture-container">
                    <div className = "profile-picture">
                        <img className="full-image" src = "" />
                    </div>
                </div>
                <FormInput Icon={PersonOutlineOutlinedIcon} placeholder = "Full Name" />
                <FormInput Icon={AlternateEmailOutlinedIcon} placeholder = "Email" />
                <FormInput Icon = {VpnKeyOutlinedIcon} placeholder = "Password" type="password" />
                <FormSelect Icon={SchoolOutlinedIcon} data = {school} />
                <FormSelect Icon={GroupsOutlinedIcon} data = {grade} />
                <FormSubmit label="Signup" />
            </form>
        </div>
    )
}