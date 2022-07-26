import MobileStackHeader from "components/header/mobile-header";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import { useSelector } from "react-redux";
import { RootState } from "types/states";
import { Inbox } from "@shared/Notification";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import "./inbox.scss"
import React from "react";
export default function InboxPage(){
    const inbox = useSelector((state: RootState)=>state.inbox) as Inbox;
    return(
        <>
            <MobileStackHeader label="Inbox" />
            <div className = "inbox-page">
                <InboxItem style={{ backgroundColor: "rgb(255 212 0)" }} Icon = {<NotificationsIcon />} title = "Activity" sub_title={`${inbox.activity.count} new activity`} />
                <InboxItem style={{ backgroundColor: "var(--red)" }} Icon = {<CampaignOutlinedIcon />} title = "Announcements" sub_title={`${inbox.announcement.count} new activity`} />
                <InboxItem style = {{ backgroundColor: "var(--blue)" }} Icon = {<MenuBookOutlinedIcon />} title = "Assignments" sub_title={`${inbox.assignment.count} new activity`} />
            </div>
        </>
    )
}

interface ItemProps {
    Icon: JSX.Element
    title: string,
    sub_title: string,
    style?: React.CSSProperties
}
function InboxItem(props: ItemProps){
    return(
        <div className="inbox-item">
            <div className = "inbox-item-icon" style= {props.style}>
                {props.Icon}
            </div>
            <div className = "inbox-item-content">
                <div className = "inbox-item-title">{props.title}</div>
                <div className = "inbox-item-sub-title">{props.sub_title}</div>
            </div>
        </div>
    )
}