export enum NotificationTypes {
    LIKED_POST,
    COMMENTED,
    REPLIED,
    NEW_ASSIGNMENT,
    NEW_ANNOUNCEMENT,
    MERIT,
    DEMERIT
}

export interface NotificationLikedPost {
    post_id: string,
}

export interface NotificationComment extends NotificationLikedPost {
    comment: string
}

export type NotificationInteraction = string;

export interface Notification<T = NotificationLikedPost|NotificationComment|NotificationInteraction>{
    notification_id: string,
    sender_id: string,
    receiver_id: string,
    type: NotificationTypes,
    content: T,
    has_read: boolean,
    sender_data: {
        type: "teacher"|"student",
        full_name: string,
        profile_picture_url: string
    },
    createdAt: Date
}

export interface Inbox {
    activity: {
        has_read: boolean
        count: number
    },
    assignment: {
        has_read: boolean
        count: number
    },
    announcement: {
        has_read: boolean
        count: number
    }
}