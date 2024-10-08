import { Assignment } from "@shared/Assignment";
import { Inbox, Notification } from "@shared/Notification";
import NotificationHandler, { NotificationTypes } from "../handler/notificationHandler";
import { Assignments } from "../models/Assignment";
import { Notifications } from "../models/Notification";
import { Controller } from "../types/controller";
import JsonResponse from "../utils/Response";

const activity_filter = (x: Notification) =>x.type === NotificationTypes.LIKED_POST || x.type === NotificationTypes.MERIT || x.type === NotificationTypes.COMMENTED || x.type === NotificationTypes.REPLIED ||  x.type === NotificationTypes.DEMERIT
const announcement_filter = (x: Notification) => x.type === NotificationTypes.NEW_ANNOUNCEMENT;
const assignment_filter = (x: Notification) => x.type === NotificationTypes.NEW_ASSIGNMENT;



export const getInbox: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        let assignments: Assignment[] = [];
        const currentUser = res.locals.user;
        const notifications = await Notifications.aggregate<Notification>([
            {
                $match: { receiver_id: currentUser.user_id }
            },
            {
                $lookup: {
                    from: "teachers",
                    foreignField: "user_id",
                    localField: "sender_id",
                    as: "sender_data_teacher",
                    pipeline: [
                        {
                            $project: {
                                profile_picture_url: 1,
                                full_name: 1,
                                user_id: 1,
                                user_type: 1
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$sender_data_teacher",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "students",
                    foreignField: "user_id",
                    localField: "sender_id",
                    as: "sender_data_student",
                    pipeline: [
                        {
                            $project: {
                                profile_picture_url: 1,
                                full_name: 1,
                                user_id: 1,
                                user_type: 1
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$sender_data_student",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    sender_data: {
                        $ifNull: ["$sender_data_teacher", "$sender_data_student", "$sender_data_teacher"]
                    },
                }
            },
            {
                $project: {
                    sender_data_student: 0,
                    sender_data_teacher: 0
                }
            },
        ]);
        if(currentUser.type === "student") assignments = await Assignments.aggregate([
            {
                $match: {
                    assigned_class: { $in: [currentUser.class_id] },
                    completed_by: { $not: { $in: [currentUser.user_id] } }
                }
            }
        ])
        const activity = notifications.filter(activity_filter);
        const announcement = notifications.filter(announcement_filter);
        const inbox: Inbox = {
            activity: {
                count: activity.filter(x=>!x.has_read).length,
                has_read: activity.every(x=>x.has_read),
            },
            announcement: {
                count: announcement.filter(x=>!x.has_read).length,
                has_read: announcement.every(x=>x.has_read),
            },
            assignment: {
                count: assignments.length,
                has_read: assignments.length === 0,
            }
        }
        return jsonResponse.success(inbox)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const getActivity: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const currentUser = res.locals.user;
        const notifications = await Notifications.aggregate<Notification>([
            {
                $match: { 
                    receiver_id: currentUser.user_id, 
                    type: { 
                        $in: [NotificationTypes.LIKED_POST, NotificationTypes.COMMENTED, NotificationTypes.MERIT, NotificationTypes.REPLIED, NotificationTypes.DEMERIT]
                    }
                }
            },
            {
                $lookup: {
                    from: "teachers",
                    foreignField: "user_id",
                    localField: "sender_id",
                    as: "sender_data_teacher",
                    pipeline: [
                        {
                            $project: {
                                profile_picture_url: 1,
                                full_name: 1,
                                user_id: 1,
                                user_type: 1
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$sender_data_teacher",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "students",
                    foreignField: "user_id",
                    localField: "sender_id",
                    as: "sender_data_student",
                    pipeline: [
                        {
                            $project: {
                                profile_picture_url: 1,
                                full_name: 1,
                                user_id: 1,
                                user_type: 1
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$sender_data_student",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    sender_data: {
                        $ifNull: ["$sender_data_teacher", "$sender_data_student", "$sender_data_teacher"]
                    },
                }
            },
            {
                $project: {
                    sender_data_student: 0,
                    sender_data_teacher: 0
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ]);
        jsonResponse.success(notifications);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const readNotification: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { user_id } = res.locals.user;
    try {
        const notification_id: string = req.params.id;
        await Notifications.findOneAndUpdate({notification_id, receiver_id: user_id }, {
            $set: {
                has_read: true
            }
        })
        jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}