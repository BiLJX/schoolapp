import { Inbox, Notification } from "@shared/Notification";
import { NotificationTypes } from "types";
import { InboxTypes } from "./inboxTypes";
const activity_filter = (x: Notification) =>x.type === NotificationTypes.LIKED_POST || x.type === NotificationTypes.INTERACTION || x.type === NotificationTypes.COMMENTED || x.type === NotificationTypes.REPLIED
const announcement_filter = (x: Notification) => x.type === NotificationTypes.NEW_ANNOUNCEMENT;
const assignment_filter = (x: Notification) => x.type === NotificationTypes.NEW_ASSIGNMENT;
export function initInbox(inbox: Inbox): Action<InboxTypes, Inbox>{
    return {
        type: InboxTypes.INIT_INBOX,
        payload: inbox
    }
}
export function newNotification(data: Notification): Action<InboxTypes, any>{
    let inboxType: InboxTypes;
    if(activity_filter(data)) inboxType = InboxTypes.NEW_ACTIVITY
    else if(announcement_filter(data)) inboxType = InboxTypes.NEW_ANNOUNCEMENT
    else if(assignment_filter(data)) inboxType = InboxTypes.NEW_ASSIGNMENT
    else inboxType = InboxTypes.NEW_ACTIVITY;
    return {
        type: inboxType,
        payload: null
    }
}