import { Notification, NotificationLikedPost } from "@shared/Notification";
import { getActivty } from "api/inbox";
import Avatar from "components/Avatar/avatar";
import { InformationError } from "components/Error/error-component";
import MobileStackHeader from "components/header/mobile-header";
import { toastError } from "components/Toast/toast";
import StackContainer from "container/mobile-layouts/stack-container";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NotificationTypes } from "types";
import "../inbox.scss"
export default function ActivityPage(){
    const [data, setData] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true)
    let content: any|any[];
    const fetchActivity = async() => {
        const res = await getActivty();
        if(res.error){
            toastError(res.message)
        }
        setData(res.data);
        setLoading(false);
    }
    useEffect(()=>{
        fetchActivity()
    }, [])
    
    if(loading) content = <></>;
    else if(data.length === 0) content = <InformationError title="No activity yet" />;
    else content = data.map((x, i)=><ActivityItem data = {x} key = {i} />) 

    return(
        <>
            <MobileStackHeader goBack label="Activity"/>
            <StackContainer className = "inbox-page inbox-activity">
                {content}
            </StackContainer>
        </>
    )
}

function ActivityItem({data}: {data: Notification}){
    if(data.type === NotificationTypes.COMMENTED){
        const _data = data as Notification<NotificationLikedPost>
        return(
            <NavLink className = "activity-item inbox-item" to = {"/post/"+_data.content_id}>
                <Avatar src={data.sender_data.profile_picture_url} size={55} style = {{ marginRight: "1rem", marginLeft: "1rem" }}/>
                <div className = "inbox-item-content">
                    <div className = "inbox-item-title">{data.sender_data.full_name}</div>
                    <div className = "inbox-item-sub-title">
                        <b>Commented </b> 
                        <span>{data.content as string}</span>
                    </div>
                </div>
            </NavLink>
        )
    }
    if(data.type === NotificationTypes.REPLIED){
        const _data = data as Notification<NotificationLikedPost>
        return(
            <NavLink className = "activity-item inbox-item" to = {"/post/"+_data.content_id}>
                <Avatar src={data.sender_data.profile_picture_url} size={55} style = {{ marginRight: "1rem", marginLeft: "1rem" }}/>
                <div className = "inbox-item-content">
                    <div className = "inbox-item-title">{data.sender_data.full_name}</div>
                    <div className = "inbox-item-sub-title">
                        <b>Replied </b> 
                        <span>{data.content as string}</span>
                    </div>
                </div>
            </NavLink>
        )
    }
    if(data.type === NotificationTypes.LIKED_POST){
        const _data = data as Notification<NotificationLikedPost>
        return(
            <NavLink className = "activity-item inbox-item" to = {"/post/"+_data.content_id}>
                <Avatar src={data.sender_data.profile_picture_url} size={55} style = {{ marginRight: "1rem", marginLeft: "1rem" }}/>
                <div className = "inbox-item-content">
                    <div className = "inbox-item-title">{data.sender_data.full_name}</div>
                    <div className = "inbox-item-sub-title">Liked your post</div>
                </div>
            </NavLink>
        )
    }
    if(data.type === NotificationTypes.INTERACTION){
        return(
            <NavLink className = "activity-item inbox-item" to = {"/teacher/"+data.sender_id}>
                <Avatar src={data.sender_data.profile_picture_url} size={55} style = {{ marginRight: "1rem", marginLeft: "1rem" }}/>
                <div className = "inbox-item-content">
                    <div className = "inbox-item-title">{data.sender_data.full_name}</div>
                    <div className = "inbox-item-sub-title">{data.title}</div>
                </div>
            </NavLink>
        )
    }
    return(
        <div className = "activity-item inbox-item">
            <Avatar src={data.sender_data.profile_picture_url} size={55} style = {{ marginRight: "1rem", marginLeft: "1rem" }}/>
            <div className = "inbox-item-content">
                <div className = "inbox-item-title">{data.sender_data.full_name}</div>
                <div className = "inbox-item-sub-title">{data.title}</div>
            </div>
        </div>
    )
}