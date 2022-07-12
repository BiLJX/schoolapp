import { NavLink } from "react-router-dom";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useSelector } from "react-redux";
import { RootState } from "types/states";
export default function AdminNav(){
    const admin = useSelector((state: RootState)=>state.admin)
    return (
        <nav>
            <div className = "nav-header">
                <div className = "nav-logo">
                    <img className="full-img" src = {admin?.logo_url} />
                </div>
                <div className = "nav-title">
                    <h2>{admin?.name}</h2>
                </div>
            </div>
            <div className = "nav-items-container">
                <NavItem Icon={AccountBoxOutlinedIcon} to = "/admin" label="Account Requests" />
                <NavItem Icon={GroupOutlinedIcon} to = "/admin/classes" label="Classes" />
                <NavItem Icon={CampaignOutlinedIcon} to = "/admin/notice" label="Notice" />
                <NavItem Icon={SettingsOutlinedIcon} to = "/admin/settings" label="Settings" />
            </div>
        </nav>
    )
}

interface NavItemProps {
    Icon: any,
    to: string,
    label: string
}
function NavItem(props: NavItemProps){
    return(
        <NavLink to = {props.to} className = "admin-nav-item">
            <div className = "nav-icon">
                <props.Icon />
            </div>
            <div className = "nav-title">{props.label}</div>
        </NavLink>
    )
}