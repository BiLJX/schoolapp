import { Inbox, Notification } from "@shared/Notification";
import { InboxTypes } from "./inboxTypes";

export default function inboxReducer(_state: Inbox|null = null, action: Action<InboxTypes, Inbox>): Inbox|null {
    const state = _state as Inbox
    switch(action.type){
        case InboxTypes.INIT_INBOX:
            return action.payload
        case InboxTypes.NEW_ASSIGNMENT:
            return {
                ...state,
                assignment: {
                    count: state.assignment.count+1,
                    has_read: false,
                }
            }
        case InboxTypes.NEW_ACTIVITY:
            return {
                ...state,
                activity: {
                    count: state.activity.count+1,
                    has_read: false,              
                }
            }
        case InboxTypes.NEW_ANNOUNCEMENT:
            return {
                ...state,
                announcement: {
                    count: state.announcement.count+1,
                    has_read: false,
                }
            }
        default: 
            return state
    }
}