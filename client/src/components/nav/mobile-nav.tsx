import { NavLink } from "react-router-dom"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import MailIcon from '@mui/icons-material/Mail';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';
import "./nav.scss"
import { useState } from "react";
export function MobileNav(){
    return(
        <nav className="mobile-nav">
            <MobileNavItem to = "/" Icon={HomeOutlinedIcon} ActiveIcon = {HomeIcon} />
            <MobileNavItem to = "/explore" Icon={SearchIcon} ActiveIcon = {SearchIcon} />
            <UploadItem />
            <MobileNavItem to = "/inbox" Icon={MailOutlinedIcon} ActiveIcon = {MailIcon} />
            <MobileNavItem to = "/profile" Icon={PersonOutlineIcon} ActiveIcon = {PersonIcon} />
        </nav>
    )
}
interface NavProps {
    Icon: any,
    to: string,
    ActiveIcon: any
}


function MobileNavItem(props: NavProps){
    const [isActive, setIsActive] = useState(false)
    const className = (state: any) => {
        setIsActive(state.isActive);
        if(state.isActive){
            return "nav-item active"
        }
        return "nav-item"
    }
    return(
        <NavLink end to = {props.to} className={className}>
            {isActive?<props.ActiveIcon />:<props.Icon />}
        </NavLink>
    )
}

function UploadItem(){
    return(
        <NavLink to = "/upload" className = "nav-item">
            <div className="nav-item-upload">
                <AddIcon />
            </div>
        </NavLink>
    )
}