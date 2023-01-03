import React from "react";
import "./form.scss";


export function FormContainer({title, children}: {title: string, children: any}){
    return(
        <form className="create-user-form">
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
    return(
        <div className = "create-user-buttons">
            <button className="back">Back</button>
            <button className="next">Next</button>
        </div>
    )
}