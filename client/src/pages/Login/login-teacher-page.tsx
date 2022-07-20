import { AlternativeOption, AuthPicture, AuthTitle, ForgotPassword, FormInput, FormSubmit } from "components/form/FormComponents";
import { useNavigate } from "react-router-dom";
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import "./login.scss"
import { useState } from "react";
import { loginTeacher } from "api/auth";
import { toastError } from "components/Toast/toast";
import { useDispatch } from "react-redux";
import { signInUser } from "redux/User/userActions";
export default function TeacherLoginPage(){
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const login = async(e: any) => {
        e.preventDefault()
        if(email && password){
            setIsLoading(true)
            const res = await loginTeacher(email, password);
            if(res.error){
                toastError(res.message);
                return setIsLoading(false);
            }
            dispatch(signInUser(res.data));
            setIsLoading(false)
        }
    }
    return(
        <div className = "auth-container">
            <AuthPicture src = "https://ouch-cdn2.icons8.com/oY245qL3ZPSUmZoZWENH9vpgK8XALHKPW8WbsxZqh0I/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNjUx/L2QzOWMxZDgyLTc2/NzctNDM2Ni1iYzQ0/LTQ5NmNmYWIzM2Rm/Yi5zdmc.png" />
            <AuthTitle title="Login as teacher" />
            <form className = "auth-form-container" onSubmit={login}>
                <FormInput Icon={AlternateEmailOutlinedIcon} placeholder = "Email" onChange={val=>setEmail(val)} />
                <FormInput Icon={VpnKeyOutlinedIcon} placeholder = "Password" type="password" onChange={ val=>setPassword(val) } />
                <ForgotPassword />
                <FormSubmit label="Login" isLoading = {isLoading} />
                <AlternativeOption to = "/signup/teacher" />
            </form>
        </div>
    )
}