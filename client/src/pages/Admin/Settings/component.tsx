import React from "react";
import "./component.scss";

export const SettingsHeading = ({children}: {children: React.ReactNode}) => {
    return <h1 className="settings-heading">{children}</h1>
}

interface InputProps {
    label: string,
    placeholder: string,
    value: string,
    onChange: (val: string) => void;
}
export const SettingsInput = ({label, placeholder, value, onChange}: InputProps) => {
    return (
        <div className="settings-input">
            <label>{label}</label>
            <input placeholder={placeholder} value = {value} onChange = {(e)=>onChange(e.target.value)} />
        </div>
    )
}

export const SettingsSaveButton = ({onSave, isDisabled}: {onSave: ()=>void, isDisabled?: boolean}) => {
    return(
        <button className="settings-save" onClick={onSave} disabled = {isDisabled}>SAVE</button>
    )
}