import { NavLink } from "react-router-dom";
import "./form-component.scss"

interface FormInputProps {
    className?: string,
    onChange?: (text: string) => any;
    Icon: any;
    placeholder: string,
    type?: string
}

export function FormInput({className, Icon, onChange, placeholder, type}: FormInputProps){
    return(
        <div className = {`form-input-container ${className || ""}`}>
            <div className = "icon-container">
                <Icon />
            </div>
            <div className = "input-container">
                <input placeholder={placeholder} type={type || "text"} onChange={(e)=>onChange?.(e.target.value)} />
            </div>
        </div>
    )
}

interface FormButtonProps {
    className?: string,
    onClick?: () => any;
    label: string;
    isDisabled?: boolean;
    color?: string
}

export function FormSubmit(props: FormButtonProps){
    if(props.isDisabled){
        return (
            <div style = {{display: "flex", justifyContent: "center", cursor: "default",backgroundColor: props.color || "var(--blue)"}} className={`form-button ${props.className || ""}`}>{props.label}</div>
        )
    }
    return(
        <button type="submit" style={{backgroundColor: props.color || "var(--blue)"}} className={`form-button ${props.className || ""}`} onClick = {()=>props.onClick?.()}>{props.label}</button>
    )
}

export function AuthTitle({title}: {title: string}){
    return(
        <div className = "auth-title">
            <h1>{title}</h1>
        </div>
    )
}

export function AuthPicture({src}: {src: string}){
    return (
        <div className = "auth-image">
            <img className="full-img" src = {src} />
        </div>
    )
}

export function ForgotPassword(){
    return(
        <NavLink to = "/forgot" style={{ marginBottom: "1rem", fontWeight: "bold", color: "var(--blue)", textAlign: "right" }}>
            Forgot password?
        </NavLink>
    )
}

export function AlternativeOption(){
    return(
        <span className="form-alternative-option">
            New to schoolify? <NavLink to = "/signup" style={ {fontWeight: "bold", color: "var(--blue)"} } >Signup</NavLink>
        </span>
    )
}