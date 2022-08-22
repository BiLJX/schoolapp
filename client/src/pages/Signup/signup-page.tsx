import { FormInput, FormSelect, FormSelectData, FormSubmit } from "components/form/FormComponents"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import WcIcon from '@mui/icons-material/Wc';
import { useEffect, useState } from "react";
import { getClasses, getSchools } from "api/schools";
import { toastError } from "components/Toast/toast";
import { Gender, StudentSignupData } from "../../../../shared/User";
import { signUpStudent } from "api/auth";
import { useDispatch } from "react-redux";
import { signInUser } from "redux/User/userActions";
import "./signup.scss"


export default function SignupUpPage(){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [schools, setSchools] = useState<FormSelectData[]>([{label: "School", value: "null"}]);
    const [classes, setClasses] = useState<FormSelectData[]>([{label: "Class", value: "null"}]);
    const [pfpUrl, setPfpUrl] = useState<string>();
    const [pfp, setPfp] = useState<File>()
    const [signupData, setSignupData] = useState<StudentSignupData>({
        full_name: "",
        email: "",
        password: "",
        school_id: "",
        class_id: "",
        gender: "null"
    })
    const school = async() => {
        const res = await getSchools();
        if(res.error) return toastError("Error fetching schools");
        setSchools([schools[0], ...res.data.map(x=>({ label: x.name, value: x.school_id }))])
    }
    const fetchClasses = async() => {
        if(!signupData.school_id || signupData.school_id == "null") return;
        const res = await getClasses(signupData.school_id);
        if(res.error) return toastError("Error fetching schools");
        setClasses([classes[0], ...res.data.map(x=>({ label: `${x.grade} ${x.section}`, value: x.class_id }))])
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
        const res = await signUpStudent(signupData, pfp)
        setLoading(false)
        if(res.error) return toastError(res.message)
        dispatch(signInUser(res.data))
    }
    useEffect(()=>{
        school()
    }, [])
    useEffect(()=>{
        fetchClasses()
    }, [signupData.school_id])
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
                <FormSelect Icon={GroupsOutlinedIcon} data = {classes} onChange={(val)=>setSignupData({...signupData, class_id: val })} />
                <FormSelect Icon={WcIcon} data = {[{label: "Gender", value: "null"}, {label: "Male", value: "Male"}, {label: "Female", value: "Female"}]} onChange={(val)=>setSignupData({...signupData, gender: val as Gender })} />
                
                <FormSubmit label="Signup" isLoading = {loading} />
            </form>
        </div>
    )
}