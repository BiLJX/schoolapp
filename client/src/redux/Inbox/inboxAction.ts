import { Inbox } from "@shared/Notification";
import { InboxTypes } from "./inboxTypes";

export function initInbox(inbox: Inbox): Action<InboxTypes, Inbox>{
    return {
        type: InboxTypes.INIT_INBOX,
        payload: inbox
    }
}

export function newActivity(notification: Notification): Action<InboxTypes, Notification>{
    return {
        type: InboxTypes.NEW_ACTIVITY,
        payload: notification
    }
}