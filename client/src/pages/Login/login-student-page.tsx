import { AlternativeOption, AuthPicture, AuthTitle, ForgotPassword, FormInput, FormSubmit } from "components/form/FormComponents";
import { useNavigate } from "react-router-dom";
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import "./login.scss"
export default function StudentLoginPage(){
    return(
        <div className = "auth-container">
            <AuthPicture src = "https://ouch-cdn2.icons8.com/oY245qL3ZPSUmZoZWENH9vpgK8XALHKPW8WbsxZqh0I/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNjUx/L2QzOWMxZDgyLTc2/NzctNDM2Ni1iYzQ0/LTQ5NmNmYWIzM2Rm/Yi5zdmc.png" />
            <AuthTitle title="Login as student" />
            <form className = "auth-form-container">
                <FormInput Icon={AlternateEmailOutlinedIcon} placeholder = "Email" />
                <FormInput Icon={VpnKeyOutlinedIcon} placeholder = "Password" type="password" />
                <ForgotPassword />
                <FormSubmit label="Login" />
                <AlternativeOption />
            </form>
        </div>
    )
}