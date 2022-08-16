import { Student, Teacher } from "@shared/User";
import NotificationHandler, { NotificationTypes } from "../handler/notificationHandler";
import { Comments } from "../models/Comment";
import { Post } from "../models/Post";
import { Controller } from "../types/controller";
import { makeId } from "../utils/idgen";
import JsonResponse from "../utils/Response";


export const getComments: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser: Student|Teacher = res.locals.user;
    try {
        const post_id = req.params.post_id;
        if(!post_id) return jsonResponse.notFound("Comments not found")
        const comments = await Comments.aggregate([
            {
                $match: {
                    post_id 
                },
            },
            {
                $lookup: {
                    from: "teachers",
                    foreignField: "user_id",
                    localField: "author_id",
                    as: "author_data_teacher",
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
                    path: "$author_data_teacher",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "students",
                    foreignField: "user_id",
                    localField: "author_id",
                    as: "author_data_student",
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
                    path: "$author_data_student",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    likes_count: { 
                        $size: "$likes"
                    },
                    author_data: {
                        $ifNull: ["$author_data_teacher", "$author_data_student", "$author_data_teacher"]
                    },
                    has_liked: {
                        $in: [currentUser.user_id, "$likes"]
                    }
                }
            },
            {
                $project: {
                    author_data_student: 0,
                    author_data_teacher: 0
                }
            },
            {
                $sort: {
                    createdAt: 1
                }
            }
        ])
        return jsonResponse.success(comments)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const addComment: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser: Student|Teacher = res.locals.user;
    let text: string = req.body.text;
    const post_id: string = req.body.post_id;
    const notification: NotificationHandler = req.app.locals.notification;
    try {
        if(!text) return jsonResponse.clientError("Please add a comment.");
        text = text.trim();
        if(!post_id) return jsonResponse.clientError("Could not find any post.");
        const post = await Post.findOne({post_id});
        if(!post) return jsonResponse.clientError("Could not find any post.");
        const comment = new Comments({
            author_id: currentUser.user_id,
            comment_id: makeId(),
            text,
            post_id,
        })
        const _comment = (await comment.save()).toJSON();
        _comment.author_data = {
            user_type: currentUser.type,
            full_name: currentUser.full_name,
            user_id: currentUser.user_id,
            profile_picture_url: currentUser.profile_picture_url
        }
        _comment.likes_count =0;
        jsonResponse.success(_comment);
        if(post.author_id === currentUser.user_id) return;
        await notification.notify({ 
            type: NotificationTypes.COMMENTED,
            receiver_id: post.author_id,
            sender_id: currentUser.user_id,
            content: {
                post_id: comment.post_id,
                comment: comment.text
            },
            sender_data: {
                full_name: currentUser.full_name,
                type: currentUser.type,
                profile_picture_url: currentUser.profile_picture_url
            }
        })
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const addReply: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser: Student|Teacher = res.locals.user;
    let text: string = req.body.text;
    const parent_id: string = req.body.parent_id;
    const notification: NotificationHandler = req.app.locals.notification;
    try {
        if(!text) return jsonResponse.clientError("Please add a reply.");
        text = text.trim();
        const comment = await Comments.findOne({comment_id: parent_id});
        if(!parent_id) return jsonResponse.clientError("Could not find any comment to reply on.");
        if(!comment) return jsonResponse.clientError("Could not find any comment to reply on.");
        const reply = new Comments({
            author_id: currentUser.user_id,
            comment_id: makeId(),
            text,
            parent_id,
            post_id: comment.post_id
        })
        const _reply = (await reply.save()).toJSON();
        _reply.author_data = {
            user_type: currentUser.type,
            full_name: currentUser.full_name,
            user_id: currentUser.user_id,
            profile_picture_url: currentUser.profile_picture_url
        }
        _reply.likes_count = 0;
        jsonResponse.success(_reply);
        if(comment.author_id === reply.author_id) return;
        await notification.notify({ 
            type: NotificationTypes.REPLIED,
            receiver_id: comment.author_id,
            sender_id: reply.author_id,
            content: {
                post_id: reply.post_id,
                comment: reply.text
            },
            sender_data: {
                full_name: currentUser.full_name,
                type: currentUser.type,
                profile_picture_url: currentUser.profile_picture_url
            }
        })
        return 
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const likeComment: Controller = async(req, res) => {
    const response = new JsonResponse(res);
    const currentUser: Student|Teacher = res.locals.user;
    try {
        const comment_id: string = req.params.comment_id;
        const comment = await Comments.findOne({comment_id});
        if(!comment) return response.clientError("no comment found");
        if(comment.likes.includes(currentUser.user_id)) return response.clientError("You have already liked the comment");
        await comment.updateOne({ 
            $push: { likes: currentUser.user_id }
        });
        return response.success()
    } catch (error) {
        console.log(error);
        response.serverError()
    }
}

export const unlikeComment: Controller = async(req, res) => {
    const response = new JsonResponse(res);
    const currentUser: Student|Teacher = res.locals.user;
    try {
        const comment_id: string = req.params.comment_id;
        const comment = await Comments.findOne({comment_id});
        if(!comment) return response.clientError("no comment found");
        if(!comment.likes.includes(currentUser.user_id)) return response.clientError("You have not liked the comment");
        await comment.updateOne({ 
            $pull: { likes: currentUser.user_id }
        });
        return response.success()
    } catch (error) {
        console.log(error);
        response.serverError()
    }
}