import Avatar from "components/Avatar/avatar";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { SettingsHeading, SettingsInput, SettingsSaveButton } from "../component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "types/states";
import { useEffect, useState } from "react";
import { School } from "@shared/School";
import useId from "@mui/material/utils/useId";
import { editSchool } from "api/admin/admin-settings";
import { toastError, toastSuccess } from "components/Toast/toast";
import { adminSignIn } from "redux/Admin/adminActions";
import "./page.scss"; 
export default function EditSchool(){
    const school = useSelector((state: RootState)=>state.admin);
    const input_id = useId()
    const [editedData, setEditedData] =  useState<School>(school as School);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [image, setImage] = useState<File>();
    const [hasChanged, setHasChanged] = useState(false);
    const dispatch = useDispatch();
    const onAvatarChange = (e: any) => {
        const image = e.target.files[0];
        setImage(image);
        const url = URL.createObjectURL(image);
        setEditedData({...editedData, logo_url: url})
    }
    const onEdit = async() => {
        if(isButtonDisabled) return;
        setIsButtonDisabled(true)
        const res = await editSchool(editedData, image);
        if(res.error){
            setIsButtonDisabled(false)
            return toastError(res.message)
        }
        dispatch(adminSignIn(editedData));
        toastSuccess("Updated School")
    }
    useEffect(()=>{
        setIsButtonDisabled(Object.keys(editedData).every((key)=>(editedData as any)[key]===(school as any)[key]))
    }, [editedData])
    return(
        <div className="edit-school">
            <header>
                <SettingsHeading>Edit School</SettingsHeading>
            </header>
            <div className = "edit-logo-container center">
                <Avatar src = {editedData.logo_url} size={80} style = {{borderRadius: "20px"}} />
                <input hidden id = {input_id} type = "file" accept = "image/*" onChange={onAvatarChange} />
                <label htmlFor = {input_id}>
                    <EditRoundedIcon />
                </label>
            </div>
            <SettingsInput value = {editedData.name || ""} onChange = {val=>setEditedData({...editedData, name: val})} label="School Name" placeholder="School" />
            <SettingsInput value = {editedData.address || ""} onChange = {val=>setEditedData({...editedData, address: val})} label="School Address" placeholder="Hattigauda, Kathmandu" />
            <SettingsInput value = {editedData.school_email || ""} onChange = {val=>setEditedData({...editedData, school_email: val})} label="School Email" placeholder="example@eg.com" />
            <SettingsSaveButton onSave={onEdit} isDisabled = {isButtonDisabled} />
        </div>
    )
}