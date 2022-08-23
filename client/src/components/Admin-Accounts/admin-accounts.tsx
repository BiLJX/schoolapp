import AdminCardContainer from "container/Admin-Cards/admin-card";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Avatar from "components/Avatar/avatar";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import "./account.scss";
import React from "react";
import { User } from "types/user";
import { NavLink } from "react-router-dom";

export function AccountsContainer({children, onSearch}: {children: React.ReactNode, onSearch: (s: string)=>void}){
    return(
        <AdminCardContainer className="accounts-container">
            <header className = "accounts-container-header">
                <h1 className = "admin-card-heading">Accounts</h1>
                <div className = "account-search">
                    <div className = "search-icon">
                        <SearchOutlinedIcon />
                    </div>
                    <input type = "text" placeholder="Search..." onChange={(e)=>onSearch(e.target.value)}/>
                </div>
            </header>
            <main className="accounts-container-items-container">
                {children}
            </main>
        </AdminCardContainer>
    )
}

export function AccountItem({user}: {user: User}){
    return(
        <NavLink to = {`${user.user_id}/preview`} state = {user} className = "account-item">
            <Avatar src = {user.profile_picture_url} size={30} />
            <span>{user.full_name}</span>
            <div className = "account-item-next">
                <NavigateNextOutlinedIcon />
            </div>
        </NavLink>
    )
}
