import React from "react";
import { useNavigate } from "react-router-dom";
import "./form.scss";


export function FormContainer({title, children, onSubmit}: {title: string, children: any, onSubmit?: () => void}){
    return(
        <form className="create-user-form" onSubmit={e=>{e.preventDefault(); onSubmit?.()}}>
            <header>
                <h2>{title}</h2>
            </header>
            <div className = "create-user-form-items-container">
                {children}
            </div>
        </form>
    )
}
interface InputProps {
    label: string,
    placeholder: string,
    value: string,
    onChange: (val: string) => void;
    type?: string;
    inputStyle?: React.CSSProperties
}
export function CreateUserFormInput({
    label, 
    placeholder, 
    value, 
    onChange, 
    type,
    inputStyle
}: InputProps){
    return (
        <div className="create-user-input">
            <label>{label}</label>
            <input type = {type || "text"} style = {inputStyle} placeholder={placeholder} value = {value} onChange = {(e)=>onChange(e.target.value)} />
        </div>
    )
}

export function CreateUserButtons(){
    const navigate = useNavigate();
    return(
        <div className = "create-user-buttons">
            <button className="back" onClick={(e)=>{e.preventDefault(); navigate(-1)}}>Back</button>
            <button className="next">Next</button>
        </div>
    )
}

export function SubHeading({children}: {children: string}){
    return(
        <div>
            <h4 style={{marginBottom: "1rem", color: "var(--text-secondary)", textAlign: "center" }}>{children}</h4>
        </div>
        
    )
}