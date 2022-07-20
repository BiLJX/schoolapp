import { FormInput, FormSelect, FormSelectData, FormSubmit } from "components/form/FormComponents"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import "./signup.scss"
import { useEffect, useState } from "react";
import { getClasses, getSchools } from "api/schools";
import { toastError } from "components/Toast/toast";
import { StudentSignupData, TeacherSignupData } from "../../../../shared/User";
import { signUpStudent, signUpTeacher } from "api/auth";
import { useDispatch } from "react-redux";
import { signInUser } from "redux/User/userActions";


export default function TeacherSignupPage(){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [schools, setSchools] = useState<FormSelectData[]>([{label: "School", value: "null"}]);
    const [pfpUrl, setPfpUrl] = useState<string>();
    const [pfp, setPfp] = useState<File>()
    const [signupData, setSignupData] = useState<TeacherSignupData>({
        full_name: "",
        email: "",
        password: "",
        school_id: "",
    })
    const school = async() => {
        const res = await getSchools();
        if(res.error) return toastError("Error fetching schools");
        setSchools([schools[0], ...res.data.map(x=>({ label: x.name, value: x.school_id }))])
    }
    const onPfp = (e: any) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file)
        setPfpUrl(url)
        setPfp(file)
    }
    const onSignup = async (e: any) => {
        e.preventDefault();
        if(!pfp) return toastError("Add a profile picture")
        setLoading(true)
        const res = await signUpTeacher(signupData, pfp)
        if(res.error) toastError(res.message)
        dispatch(signInUser(res.data))
        setLoading(false)
    }
    useEffect(()=>{
        school()
    }, [])
    return(
        <div className = "auth-container">
            <form className="auth-form-container" onSubmit={onSignup}>
                <div className = "profile-picture-container">
                    <div className = "profile-picture">
                        <input id = "pfp-upload" type = "file" hidden onChange={onPfp} />
                        <label htmlFor="pfp-upload" className = "pfp-upload-icon" >
                            <EditOutlinedIcon />
                        </label>
                        <img className="full-img" src = {pfpUrl} />
                    </div>
                </div>
                <FormInput Icon={PersonOutlineOutlinedIcon} placeholder = "Full Name" onChange={(val)=>setSignupData({...signupData, full_name: val })} />
                <FormInput Icon={AlternateEmailOutlinedIcon} placeholder = "Email" onChange={(val)=>setSignupData({...signupData, email: val })} />
                <FormInput Icon = {VpnKeyOutlinedIcon} placeholder = "Password" type="password" onChange={(val)=>setSignupData({...signupData, password: val })} />
                <FormSelect Icon={SchoolOutlinedIcon} data = {schools} onChange={(val)=>setSignupData({...signupData, school_id: val })} />
                <FormSubmit label="Signup" isLoading = {loading} />
            </form>
        </div>
    )
}