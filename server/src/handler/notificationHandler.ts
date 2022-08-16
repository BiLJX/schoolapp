import { Server } from "socket.io";
import { Notification, NotificationComment, NotificationInteraction, NotificationLikedPost } from "@shared/Notification";
import { Notifications } from "../models/Notification";
import { makeId } from "../utils/idgen";
interface SendNotificationData {
    sender_id: string,
    receiver_id: string,
    type?: NotificationTypes,
    content?: any,
    sender_data: {
        type: "teacher"|"student",
        full_name: string,
        profile_picture_url: string
    }
}

export enum NotificationTypes {
    LIKED_POST,
    COMMENTED,
    REPLIED,
    NEW_ASSIGNMENT,
    NEW_ANNOUNCEMENT,
    MERIT,
    DEMERIT
}

export default class NotificationHandler {
    constructor(private io: Server){};
    public async notify(data: SendNotificationData, save_notification: boolean = true){
        try {
            if(data.receiver_id === data.sender_id) return;
            const notificationDoc = new Notifications({
                ...data,
                notification_id: makeId(),
            });
            if(save_notification) (await notificationDoc.save()).toJSON() as Notification<NotificationComment>;
            this.io.to(data.receiver_id).emit("newNotification", notificationDoc);
        } catch (error) {
            console.log(error);
        }
    }
    get Types(){
        return NotificationTypes
    }
}