import MobileStackHeader from "components/header/mobile-header";
import { useSelector } from "react-redux";
import { RootState } from "types/states";
import { UploadPost } from "./upload-post/upload-post";
import StackContainer from "container/mobile-layouts/stack-container";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import "./scss/upload.scss"
import { Navigate, NavLink } from "react-router-dom";

export default function UploadPage(){
    const currentUser = useSelector((state: RootState)=>state.currentUser);
    if(currentUser?.type === "student"){
        return <UploadPost />
    }
    return(
        <>
            <MobileStackHeader label = "Upload" goBack />
            <StackContainer className = "upload-page">
                <Item Icon={<AssignmentOutlinedIcon />} label = "Give Assignment" to = "assignment" />
                <Item Icon={<CollectionsOutlinedIcon />} label = "Upload a Post" to = "post" />
            </StackContainer>
        </>
    )
}
interface Props {
    Icon: JSX.Element,
    label: string,
    to: string
}
function Item({Icon, label, to}: Props){
    return(
        <NavLink to = {to} className = "upload-item">
            <div className = "upload-item-icon">
                {Icon}
            </div>
            <div className="upload-item-label">{label}</div>
            <div className="upload-item-next-arrow">
                <NavigateNextRoundedIcon />
            </div>
        </NavLink>
    )
}