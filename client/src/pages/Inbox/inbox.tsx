import MobileStackHeader from "components/header/mobile-header";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import { useSelector } from "react-redux";
import { RootState } from "types/states";
import { Inbox } from "@shared/Notification";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import "./inbox.scss"
import React from "react";
import { NavLink } from "react-router-dom";
import { Student, Teacher } from "@shared/User";
export default function InboxPage(){
    const inbox = useSelector((state: RootState)=>state.inbox) as Inbox;
    const { type } = useSelector((state: RootState)=>state.currentUser) as Student|Teacher;
    return(
        <>
            <MobileStackHeader label="Inbox" />
            <div className = "inbox-page">
                <InboxItem to = "activity" style={{ backgroundColor: "rgb(255 212 0)" }} Icon = {<NotificationsIcon />} title = "Activity" sub_title={`${inbox.activity.count} new activity`} isActive = {!inbox.activity.has_read} />
                <InboxItem to = "assignment" style = {{ backgroundColor: "var(--blue)" }} Icon = {<MenuBookOutlinedIcon />} title = {type === "student"?"Assignments":"Given Assignments"} sub_title={type === "student"?`${inbox.assignment.count} pending assignments`:"See given assignments"} isActive = {!inbox.assignment.has_read} />
                {/* <InboxItem to = "announcement" style={{ backgroundColor: "var(--red)" }} Icon = {<CampaignOutlinedIcon />} title = "Announcements" sub_title={`${inbox.announcement.count} new announcments`} isActive = {!inbox.announcement.has_read} /> */}
                <InboxItem to = "announcement" style={{ backgroundColor: "var(--red)" }} Icon = {<CampaignOutlinedIcon />} title = "Announcements" sub_title="View announcements" isActive = {!inbox.announcement.has_read} />
            </div>
        </>
    )
}

interface ItemProps {
    Icon: JSX.Element
    title: string,
    sub_title: string,
    style?: React.CSSProperties,
    to: string,
    isActive: boolean
}

function InboxItem(props: ItemProps){
    return(
        <NavLink to = {props.to} className={`inbox-item ${props.isActive?"active":""}`}>
            <div className = "inbox-item-icon" style= {props.style}>
                {props.Icon}
            </div>
            <div className = "inbox-item-content">
                <div className = "inbox-item-title" style={{color: "var(--text-secondary)"}}>{props.title}</div>
                <div className = "inbox-item-sub-title">{props.sub_title}</div>
            </div>
        </NavLink>
    )
}