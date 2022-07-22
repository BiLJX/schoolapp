import { ClientPostDataImage, ClientPostDataText } from "@shared/Post";
import { Controller } from "../types/controller";
import { makeId } from "../utils/idgen";
import JsonResponse from "../utils/Response";
import { upload, uploadFile } from "../utils/upload";
import { validatePostBody, validatePostTitle } from "../utils/validator";
import { Post } from "../models/Post"
import { Student } from "@shared/User";


export const getFeedPost: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser: Student = res.locals.user;
    try {
        const posts = await Post.aggregate([
            {
                $match: {
                    school_id: currentUser.school_id
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
                    author_data: {
                        $ifNull: ["$author_data_teacher", "$author_data_student", "$author_data_teacher"]
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

export const uploadPost: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser: Student = res.locals.user
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
                await post.save()
            } else {
                if(!picture.mimetype.includes("image")) return jsonResponse.clientError("Invalid file format");
                const url = await uploadFile({buffer: picture.buffer, replace: false, dir: `user/${currentUser.user_id}/post/${post_id}`});
                const post = new Post({
                    ...data,
                    post_type: "image",
                    body: null,
                    post_id,
                    school_id: currentUser.school_id, 
                    author_id: currentUser.user_id,
                    content_src: url
                })
                await post.save();
            }
            jsonResponse.success({post_id});
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    })   
}