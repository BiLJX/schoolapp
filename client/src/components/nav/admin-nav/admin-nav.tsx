import React from "react";
import { NavLink } from "react-router-dom";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import "./admin-nav.scss";

export default function AdminNav(){
    return(
        <nav className="admin-nav">
            <div className = "admin-nav-header">
                <h1>Classital</h1>
            </div>
            <NavItemsContainer name = "MENU">
                <NavItem end to = "" label = "Dashboard" Icon={<DashboardOutlinedIcon />}  />
                <NavItem to = "user/student" label = "Students" Icon={<PersonOutlineOutlinedIcon />}  />
                <NavItem to = "user/teacher" label = "Teachers" Icon={<CastForEducationOutlinedIcon />}  />
                <NavItem to = "classes" label = "Classes" Icon={<GroupsOutlinedIcon />}  />
            </NavItemsContainer>
            <NavItemsContainer name = "REQUESTS">
                <NavItem to = "requests/student" label = "Students" Icon = {<PersonOutlineOutlinedIcon />} />
                <NavItem to = "requests/teacher" label = "Teachers" Icon = {<CastForEducationOutlinedIcon />} />
            </NavItemsContainer>
        </nav>
    )
}


interface NavItemProps {
    Icon: JSX.Element,
    to: string,
    label: string,
    end?: boolean
}
function NavItem({
    Icon,
    to,
    label,
    end
}: NavItemProps){
    return(
        <NavLink end = {end} className="admin-nav-item" to = {to}>
            <div className = "admin-nav-item-icon">{Icon}</div>
            <div className = "admin-nav-item-label">{label}</div>
        </NavLink>
    )
}


function NavItemsContainer({children, name}: {children: React.ReactNode, name: string}){
    return(
        <div className="admin-nav-items-container">
            <div className = "nav-items-container-name">{name}</div>
            {children}
        </div>
    )
}