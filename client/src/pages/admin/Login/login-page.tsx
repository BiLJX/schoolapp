import { FormInput, FormSubmit } from "components/form/FormComponents";
import SchoolIcon from '@mui/icons-material/School';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import "./scss/login.scss"
import { useState } from "react";
import { adminLogin } from "api/admin/admin";
import { useDispatch, useSelector } from "react-redux";
import { adminSignIn } from "redux/Admin/adminActions";
import { RootState } from "types/states";
import { Navigate } from "react-router-dom";
import { toastError, toastSuccess } from "components/Toast/toast";
export default function AdminLoginPage(){
    const dispatch = useDispatch();
    const admin = useSelector((state: RootState)=>state.admin)
    const [credentials, setCredentials] = useState({ school_name: "", password: "" });
    const [signingIn, setSigningIn] = useState(false);
    const login = async (e: any) => {
        e.preventDefault();
        setSigningIn(true)
        const admin = await adminLogin(credentials.school_name, credentials.password);
        if(admin.error) {
            toastError(admin.message);
            return setSigningIn(false)
        }
        dispatch(adminSignIn(admin.data));
        toastSuccess(admin.message)
        return setSigningIn(false)
    }
    if(admin){
        return( <Navigate to = "/admin" /> )
    }
    return (
        <div className = "admin-login-page">
            <form className = "admin-login-form" onSubmit={login}>
                <div className = "header">
                    <h1>ADMIN PANNEL</h1>
                </div>
                <div className = "main">
                    <FormInput placeholder="School Name" Icon={SchoolIcon} onChange = {(name)=>setCredentials({...credentials, school_name: name})} />
                    <FormInput placeholder="Password" Icon={LockOutlinedIcon} type = "password" onChange = {(password)=>setCredentials({...credentials, password})} />
                </div>
                <div className = "footer">
                    <FormSubmit label={signingIn?"Loging in...":"Login"} />
                </div>
            </form>
        </div>
    )
}