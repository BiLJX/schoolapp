import { ClientPostDataImage, ClientPostDataText } from "@shared/Post";
import { Controller } from "../types/controller";
import { makeId } from "../utils/idgen";
import JsonResponse from "../utils/Response";
import { upload, uploadFile } from "../utils/upload";
import { validatePostBody, validatePostTitle } from "../utils/validator";
import { Post } from "../models/Post"
import { Student, Teacher } from "@shared/User";
import sharp from "sharp";
import moment from "moment";
import { Comments } from "../models/Comment";


export const getFeedPost: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser: Student|Teacher = res.locals.user;
    try {
        const posts = await Post.aggregate([
            {
                $match: {
                    school_id: currentUser.school_id
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "post_id",
                    foreignField: "post_id",
                    as: "comments"
                }
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
                                full_name: 1
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
                                full_name: 1
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
                    comment_count: {
                        $size: "$comments"
                    },
                    like_count: { 
                        $size: "$liked_by"
                    },
                    author_data: {
                        $ifNull: ["$author_data_teacher", "$author_data_student", "$author_data_teacher"]
                    },
                    has_liked: {
                        $in: [currentUser.user_id, "$liked_by"]
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
                    createdAt: -1
                }
            }
        ]);
        jsonResponse.success(posts)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const getPostById: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser: Student|Teacher = res.locals.user;
    const post_id: string = req.params.post_id;
    try {
        if(!post_id) return jsonResponse.notFound("post not found :(");
        const posts = await Post.aggregate([
            {
                $match: {
                    school_id: currentUser.school_id,
                    post_id
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "post_id",
                    foreignField: "post_id",
                    as: "comments"
                }
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
                                full_name: 1
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
                                full_name: 1
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
                    like_count: { 
                        $size: "$liked_by"
                    },
                    comment_count: {
                        $size: "$comments"
                    },
                    author_data: {
                        $ifNull: ["$author_data_teacher", "$author_data_student", "$author_data_teacher"]
                    },
                    has_liked: {
                        $in: [currentUser.user_id, "$liked_by"]
                    }
                }
            },
            {
                $project: {
                    author_data_student: 0,
                    author_data_teacher: 0,
                    comments: 0
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ]);
        if(!posts[0]) return jsonResponse.notFound("Post not found :(")
        jsonResponse.success(posts[0])
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const uploadPost: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser: Student|Teacher = res.locals.user
    upload(req, res, async err=>{
        try {
            if(err) return jsonResponse.serverError();
            const data: ClientPostDataImage|ClientPostDataText = req.body;
            const files = <Express.Multer.File[]>req.files;
            const picture = files[0];
            const post_id = makeId();
            //validation
            const titleValid = validatePostTitle(data.title);
            if(!titleValid.success) return jsonResponse.clientError(titleValid.message);
            if("body" in data && !picture){
                const bodyValid = validatePostBody(data.body);
                if(!bodyValid.success) return jsonResponse.clientError(bodyValid.message);
                const post = new Post({
                    ...data, 
                    post_id,
                    school_id: currentUser.school_id, 
                    author_id: currentUser.user_id,
                    post_type: "text"
                })
                const _post = (await post.save()).toJSON();
                _post.author_data = {
                    full_name: currentUser.full_name,
                    profile_picture_url: currentUser.profile_picture_url
                }
                jsonResponse.success(_post);
                return;
            } else {
                if(!picture.mimetype.includes("image")) return jsonResponse.clientError("Invalid file format");
                const buffer = await sharp(picture.buffer).jpeg({ quality: 80 }).toBuffer()
                const url = await uploadFile({buffer, replace: false, dir: `user/${currentUser.user_id}/post/${post_id}`});
                const post = new Post({
                    ...data,
                    post_type: "image",
                    body: null,
                    post_id,
                    school_id: currentUser.school_id, 
                    author_id: currentUser.user_id,
                    content_src: url
                })
                const _post = (await post.save()).toJSON();
                _post.author_data = {
                    full_name: currentUser.full_name,
                    profile_picture_url: currentUser.profile_picture_url
                }
                _post.like_count = 0;
                _post.has_liked = false;
                jsonResponse.success(_post);
                return;
            }
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    })   
}

export const likePost: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser: Student|Teacher = res.locals.user;
    const post_id = req.params.post_id
    try {
        const post = await Post.findOne({post_id});
        if(!post) return jsonResponse.notFound("Post not found");
        if(post.liked_by.includes(currentUser.user_id)) return jsonResponse.clientError("Already liked");
        await post.updateOne({
            $push: {  
                liked_by: currentUser.user_id
            }
        });
        return jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const unlikePost: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser: Student|Teacher = res.locals.user;
    const post_id = req.params.post_id
    try {
        const post = await Post.findOne({post_id});
        if(!post) return jsonResponse.notFound("Post not found");
        if(!post.liked_by.includes(currentUser.user_id)) return jsonResponse.clientError("Post has not been liked.");
        await post.updateOne({
            $pull: {  
                liked_by: currentUser.user_id
            }
        });
        return jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const deletePost: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser: Student|Teacher = res.locals.user;
    const post_id = req.params.post_id;
    try {
        await Post.deleteOne({post_id, author_id: currentUser.user_id});
        await Comments.deleteMany({post_id});
        jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}