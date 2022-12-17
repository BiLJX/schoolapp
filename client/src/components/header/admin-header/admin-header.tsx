import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { NavLink } from 'react-router-dom';
import "./admin-header.scss"
interface HeaderProps {
    title: string,
    sub_title: string
}
export default function AdminHeader({
    title,
    sub_title
}:HeaderProps){
    return(
        <header className="admin-header">
            <div className = "admin-header-labels">
                <h1>{title}</h1>
                <span>{sub_title}</span>
            </div>
            <div className = "admin-header-button-container">
                <NavLink to = "/admin/settings/edit" className = "admin-header-button">
                    <SettingsOutlinedIcon />
                </NavLink>
            </div>
        </header>
    )
}