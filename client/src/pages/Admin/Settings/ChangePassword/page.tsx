import { SettingsHeading, SettingsInput, SettingsSaveButton } from "../component";
import { useState } from "react"
import "./page.scss";
import { changeAdminPassword } from "api/admin/admin-settings";
import { toastError, toastSuccess } from "components/Toast/toast";

interface PasswordData {
    old_password: string;
    new_password: string;
    confirm_password: string;
}
export default function ChangePasswordAdmin(){
    const [passData, setPassData] = useState<PasswordData>({old_password: "", new_password: "", confirm_password: ""})
    const [isLoading, setIsLoading] = useState(false);
    const changePassword = async(e?: any) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await changeAdminPassword(passData);
        setIsLoading(false);
        if(res.error) return toastError(res.message);
        setPassData({old_password: "", new_password: "", confirm_password: ""});
        toastSuccess("Successfully changed password");
    }
    return (
        <form className = "change-school-password" onSubmit={changePassword}>
            <header>
                <SettingsHeading>Change Password</SettingsHeading>
            </header>
            <SettingsInput 
            label="Old Password" 
            placeholder="" 
            value={passData.old_password} 
            type = "password"
            onChange={val=>setPassData({...passData, old_password: val})}  
            />
            <SettingsInput 
            label="New Password" 
            placeholder="" 
            value={passData.new_password} 
            type = "password"
            onChange={val=>setPassData({...passData, new_password: val})}  
            />
            <SettingsInput 
            label="Confirm Password" 
            placeholder="" 
            value={passData.confirm_password} 
            type = "password"
            onChange={val=>setPassData({...passData, confirm_password: val})}  
            />
            <SettingsSaveButton onSave={changePassword} label = "CHANGE" isDisabled = {isLoading} />
        </form>
    )
}