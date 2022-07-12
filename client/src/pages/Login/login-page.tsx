import { AuthPicture, AuthTitle, FormSubmit } from "components/form/FormComponents";
import { useNavigate } from "react-router-dom";
import "./login.scss"
export default function LoginPage(){
    const navigate = useNavigate()
    return(
        <div className = "auth-container">
            <AuthPicture src = "https://png.pngtree.com/png-vector/20200310/ourmid/pngtree-online-education-training-course-design-concept-vector-illustration-png-image_2158408.jpg" />
            <AuthTitle title="Login as" />
            <div className = "auth-form-container">
                <FormSubmit className="auth-bold" label="Student" color="var(--red)" onClick={()=>navigate("student")} />
                <FormSubmit className="auth-bold" label="Teacher" color="var(--red)" onClick={()=>navigate("teacher")}/>
                <div style={{ textAlign: "center", padding: "1rem 0", fontWeight: "bold", color: "var(--text-secondary)"}}>Don't have an accout?</div>
                <FormSubmit className="auth-bold" label="Signup" onClick={()=>navigate("/signup")}/>
            </div>
        </div>
    )
}