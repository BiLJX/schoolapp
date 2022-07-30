import { Notification, NotificationComment, NotificationInteraction, NotificationLikedPost } from "@shared/Notification";
import { getActivty, readNotification } from "api/inbox";
import Avatar from "components/Avatar/avatar";
import { InformationError } from "components/Error/error-component";
import MobileStackHeader from "components/header/mobile-header";
import { toastError } from "components/Toast/toast";
import StackContainer from "container/mobile-layouts/stack-container";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { readNotificationAction } from "redux/Inbox/inboxAction";
import { NotificationTypes } from "types";
import "../inbox.scss"
export default function ActivityPage(){
    const [data, setData] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    
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
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const read = async(redirect: string) => {
        if(!data.has_read){
            readNotification(data.notification_id);
            dispatch(readNotificationAction());
        }
        navigate(redirect);
    }
    if(data.type === NotificationTypes.COMMENTED){
        const _data = data as Notification<NotificationComment>
        return(
            <div className = "activity-item inbox-item" onClick = {()=>read("/post/"+_data.content.post_id)}>
                <Avatar src={data.sender_data.profile_picture_url} size={55} style = {{ marginRight: "1rem", marginLeft: "1rem" }}/>
                <div className = "inbox-item-content">
                    <div className = {`inbox-item-title${!data.has_read?" active":""}`}>{data.sender_data.full_name}</div>
                    <div className = {`inbox-item-sub-title${!data.has_read?" active":""}`}>
                        <b>Commented </b> 
                        <span>{_data.content.comment }</span>
                    </div>
                </div>
            </div>
        )
    }
    if(data.type === NotificationTypes.REPLIED){
        const _data = data as Notification<NotificationComment>
        return(
            <div className = "activity-item inbox-item" onClick = {()=>read("/post/"+_data.content.post_id)}>
                <Avatar src={data.sender_data.profile_picture_url} size={55} style = {{ marginRight: "1rem", marginLeft: "1rem" }}/>
                <div className = "inbox-item-content">
                    <div className = {`inbox-item-title${!data.has_read?" active":""}`}>{data.sender_data.full_name}</div>
                    <div className = {`inbox-item-sub-title${!data.has_read?" active":""}`}>
                        <b>Replied </b>
                        <span>{_data.content.comment}</span>
                    </div>
                </div>
            </div>
        )
    }
    if(data.type === NotificationTypes.LIKED_POST){
        const _data = data as Notification<NotificationLikedPost>
        return(
            <div className = "activity-item inbox-item" onClick = {()=>read("/post/"+_data.content.post_id)}>
                <Avatar src={data.sender_data.profile_picture_url} size={55} style = {{ marginRight: "1rem", marginLeft: "1rem" }}/>
                <div className = "inbox-item-content">
                    <div className = {`inbox-item-title${!data.has_read?" active":""}`}>{data.sender_data.full_name}</div>
                    <div className = {`inbox-item-sub-title${!data.has_read?" active":""}`}>Liked your post</div>
                </div>
            </div>
        )
    }
    if(data.type === NotificationTypes.MERIT){
        const _data = data as Notification<NotificationInteraction>
        return(
            <div className = "activity-item inbox-item" onClick = {()=>read("/teacher/"+data.sender_id)}>
                <Avatar src={data.sender_data.profile_picture_url} size={55} style = {{ marginRight: "1rem", marginLeft: "1rem" }}/>
                <div className = "inbox-item-content">
                    <div className = {`inbox-item-title${!data.has_read?" active":""}`}>{data.sender_data.full_name}</div>
                    <div className = {`inbox-item-sub-title${!data.has_read?" active":""}`}>Gave you merit for {_data.content}</div>
                </div>
            </div>
        )
    }
    if(data.type === NotificationTypes.DEMERIT){
        const _data = data as Notification<NotificationInteraction>
        return(
            <div className = "activity-item inbox-item" onClick = {()=>read("/teacher/"+data.sender_id)}>
                <Avatar src={data.sender_data.profile_picture_url} size={55} style = {{ marginRight: "1rem", marginLeft: "1rem" }}/>
                <div className = "inbox-item-content">
                    <div className = {`inbox-item-title${!data.has_read?" active":""}`}>{data.sender_data.full_name}</div>
                    <div className = {`inbox-item-sub-title${!data.has_read?" active":""}`}>Gave you demerit for {_data.content}</div>
                </div>
            </div>
        )
    }
    return(
        <div className = "activity-item inbox-item">
            <Avatar src={data.sender_data.profile_picture_url} size={55} style = {{ marginRight: "1rem", marginLeft: "1rem" }}/>
            <div className = "inbox-item-content">
                <div className = {`inbox-item-title${!data.has_read?" active":""}`}>{data.sender_data.full_name}</div>
                <div className = {`inbox-item-sub-title${!data.has_read?" active":""}`}>{}</div>
            </div>
        </div>
    )
}