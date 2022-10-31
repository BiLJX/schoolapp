import React from "react";
import "./component.scss";

export const SettingsHeading = ({children}: {children: React.ReactNode}) => {
    return <h1 className="settings-heading">{children}</h1>
}

interface InputProps {
    label: string,
    placeholder: string
}
export const SettingsInput = ({label, placeholder}: InputProps) => {
    return (
        <div className="settings-input">
            <label>{label}</label>
            <input placeholder={placeholder} />
        </div>
    )
}

export const SettingsSaveButton = ({onSave}: {onSave: ()=>void}) => {
    return(
        <button className="settings-save" onClick={onSave}>SAVE</button>
    )
}