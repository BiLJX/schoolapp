import { NavLink } from "react-router-dom";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
export default function AdminSettingsNav(){
    return(
        <nav className="admin-settings-nav">
            <NavItem to = "edit" label="Edit School" Icon={<EditRoundedIcon />} />
            <NavItem to = "password/change" label="Change Password" Icon={<LockRoundedIcon />} />
            <NavItem to = "notification" label="Notifications" Icon={<NotificationsRoundedIcon />} />
        </nav>
    )
}

interface ItemProps {
    Icon: JSX.Element;
    label: string;
    to: string
}
function NavItem({Icon, label, to}: ItemProps){
    return(
        <NavLink to = {to} className="settings-nav-item">
            <div className = "item-icon">
                {Icon}
            </div>
            <div className = "item-label">
                {label}
            </div>
            <div className = "item-next-icon">
                <NavigateNextRoundedIcon />
            </div>  
        </NavLink>
    )
}