import { Server } from "socket.io";
import { Notification, NotificationComment, NotificationInteraction, NotificationLikedPost, NotificationTypes } from "../../../shared/Notification";
import { Notifications } from "../models/Notification";
import { makeId } from "../utils/idgen";
interface SendNotificationData {
    sender_id: string,
    receiver_id: string,
    type?: NotificationTypes,
    title: string,
    content_id?: string,
    notification_id?: string
}

export default class NotifcationHandler {
    constructor(private io: Server){};
    public async sendInteraction(notification_data: SendNotificationData){
        try {
            notification_data.type = NotificationTypes.INTERACTION;
            notification_data.notification_id = makeId();
            const notificationDoc = new Notifications(notification_data);
            const notification = (await notificationDoc.save()).toJSON() as Notification<NotificationInteraction>;
            notification.content = notification_data.title;
            this.notify(notification);
        } catch (error) {
            console.log(error);
        }
    }
    public async sendLike(notification_data: SendNotificationData, data: NotificationLikedPost){
        try {
            notification_data.type = NotificationTypes.LIKED_POST;
            notification_data.notification_id = makeId();
            const notificationDoc = new Notifications(notification_data);
            const notification = (await notificationDoc.save()).toJSON() as Notification<NotificationLikedPost>;
            notification.content = data;
            this.notify(notification);
        } catch (error) {
            console.log(error);
        }
    }
    public async comment(notification_data: SendNotificationData, comment: NotificationComment){
        try {
            notification_data.type = NotificationTypes.COMMENTED;
            notification_data.notification_id = makeId();
            const notificationDoc = new Notifications(notification_data);
            const notification = (await notificationDoc.save()).toJSON() as Notification<NotificationComment>;
            notification.content = comment;
            this.notify(notification);
        } catch (error) {
            console.log(error);
        }
    }
    public async reply(notification_data: SendNotificationData, comment: NotificationComment){
        try {
            notification_data.type = NotificationTypes.REPLIED;
            notification_data.notification_id = makeId();
            const notificationDoc = new Notifications(notification_data);
            const notification = (await notificationDoc.save()).toJSON() as Notification<NotificationComment>;
            notification.content = comment;
            this.notify(notification);
        } catch (error) {
            console.log(error);
        }
    }
    private notify(data: Notification){
        this.io.to(data.receiver_id).emit("newNotification", data)
    }
    get Types(){
        return NotificationTypes
    }
}