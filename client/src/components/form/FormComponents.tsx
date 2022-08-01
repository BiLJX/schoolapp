import React from "react";
import { NavLink } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import "./form-component.scss"

interface FormInputProps {
    className?: string,
    onChange?: (val: string) => any;
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

interface FormTextAreatProps {
    className?: string,
    onChange?: (text: string) => any;
    Icon: any;
    placeholder: string,
}

export function FormTextArea({className, Icon, onChange, placeholder}: FormTextAreatProps){
    return(
        <div className = {`form-input-container ${className || ""}`}>
            <div className = "icon-container">
                <Icon />
            </div>
            <div className = "input-container">
                <ReactTextareaAutosize placeholder={placeholder} minRows={3} onChange={(e)=>onChange?.(e.target.value)} />
            </div>
        </div>
    )
}

export interface FormSelectData {
    label: string,
    value: string
}

interface FormSelectProps {
    className?: string,
    onChange?: (text: string) => any;
    Icon: any;
    data: FormSelectData[],
}

export function FormSelect(props: FormSelectProps){
    return(
        <div className = {`form-input-container ${props.className || ""}`}>
            <div className = "icon-container">
                <props.Icon />
            </div>
            <div className = "input-container">
                <select onChange={(e)=>props.onChange?.(e.target.value)}>
                    {props.data.map((data, i)=><option key = {i} value = {data.value}>{data.label}</option>)}
                </select>
            </div>
        </div>
    )
}

interface SimpleSelectProps {
    className?: string,
    onChange: any;
    data: FormSelectData[],
    style?: any,
    value: string,
}

export function SimpleSelect(props: SimpleSelectProps){
    return(
        <div className = {`form-input-container ${props.className || ""}`} style = {props.style}>
            <div className = "input-container">
                <select onChange={(e)=>props.onChange(e.target.value)} value = {props.value}>
                    {props.data.map((data, i)=>(data?<option key = {i} value = {data.value}>{data.label}</option>:null))}
                </select>
            </div>
        </div>
    )
}

interface FormButtonProps {
    className?: string,
    onClick?: () => any;
    label: string;
    isDisabled?: boolean;
    color?: string;
    isLoading?: boolean;

}

export function FormSubmit(props: FormButtonProps){
    if(props.isDisabled){
        return (
            <div style = {{display: "flex", justifyContent: "center", cursor: "default",backgroundColor: props.color || "var(--blue)"}} className={`form-button ${props.className || ""}`}>{props.label}</div>
        )
    }
    if(props.isLoading){
        return (
            <div style = {{display: "flex", justifyContent: "center", cursor: "default",backgroundColor: props.color || "var(--blue)"}} className={`form-button ${props.className || ""}`}>Loading...</div>
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

export function AuthPicture({src, style}: {src: string, style?: React.CSSProperties}){
    return (
        <div className = "auth-image" style = {style}>
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

export function AlternativeOption({to}:{to: string}){
    return(
        <span className="form-alternative-option">
            New to schoolify? <NavLink to = {to} style={ {fontWeight: "bold", color: "var(--blue)"} } >Signup</NavLink>
        </span>
    )
}