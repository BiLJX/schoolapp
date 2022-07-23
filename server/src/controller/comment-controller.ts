import { Student, Teacher } from "@shared/User";
import { Comments } from "../models/Comment";
import { Post } from "../models/Post";
import { Controller } from "../types/controller";
import { makeId } from "../utils/idgen";
import JsonResponse from "../utils/Response";

export const addComment: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser: Student|Teacher = res.locals.user;
    let text: string = req.body.text;
    const post_id: string = req.body.post_id
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
        return jsonResponse.success(comment);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const addReply: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser: Student|Teacher = res.locals.user;
    let text: string = req.body.text;
    const parent_id: string = req.body.parent_id
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
        await reply.save();
        return jsonResponse.success(reply);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}