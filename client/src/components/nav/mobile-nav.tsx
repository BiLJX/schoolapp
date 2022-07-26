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
import { RootState } from "types/states";
import { useSelector } from "react-redux";
import { Student, Teacher } from "@shared/User";
export function MobileNav(){
    const currentUser = useSelector((state: RootState)=>state.currentUser) as Teacher|Student;
    return(
        <nav className="mobile-nav">
            <MobileNavItem to = "/" Icon={HomeOutlinedIcon} ActiveIcon = {HomeIcon} />
            <MobileNavItem to = "/explore" Icon={SearchIcon} ActiveIcon = {SearchIcon} />
            <UploadItem />
            
            <MobileNavItem to = "/inbox" Icon={MailOutlinedIcon} ActiveIcon = {MailIcon} badge = {<Badge />} />
            <MobileNavItem to = {`/${currentUser.type}/${currentUser.user_id}`} Icon={PersonOutlineIcon} ActiveIcon = {PersonIcon} />
        </nav>
    )
}

function Badge(){
    const inbox = useSelector((state: RootState)=>state.inbox);
    if(!inbox) return <></>
    const total = inbox?.activity.count + inbox?.announcement.count + inbox?.assignment.count;
    if(!total) return <></>
    return(
        <span className = "nav-badge">
            {total>9?"9+":total}
        </span>
    )
}
interface NavProps {
    Icon: any,
    to: string,
    ActiveIcon: any,
    badge?: React.ReactNode
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
            {props.badge}
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