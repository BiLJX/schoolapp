import { Request, Response } from "express";
import { Students } from "../models/Student";
import { Teachers } from "../models/Teacher";
import { Controller } from "../types/controller";
import JsonResponse from "../utils/Response"

export const getCurrentUser = (req: Request, res: Response) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const user = res.locals.user;
        jsonResponse.success(user);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const getStudentById: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const user_id = req.params.user_id;
        const users = await Students.aggregate([
            {
                $match: {
                    user_id
                }
            },
            {
                $lookup: {
                    from: "schools",
                    localField: "school_id",
                    foreignField: "school_id",
                    as: "school",
                    pipeline: [
                        {
                            $project: {
                                password: 0
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "classes",
                    localField: "class_id",
                    foreignField: "class_id",
                    as: "class",
                    pipeline: [
                        {
                            $project: {
                                password: 0
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$school"
                }
            },
            {
                $unwind: {
                    path: "$class"
                }
            },
        ]);
        const user = users[0];
        if(user) {
            user.type = "student";
            return jsonResponse.success(user);
        }
        jsonResponse.notFound("Student not found.")
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const getTeacherById: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const user_id = req.params.user_id;
        const users = await Teachers.aggregate([
            {
                $match: {
                    user_id
                }
            },
            {
                $lookup: {
                    from: "schools",
                    localField: "school_id",
                    foreignField: "school_id",
                    as: "school",
                    pipeline: [
                        {
                            $project: {
                                password: 0
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$school"
                }
            },
            {
                $unwind: {
                    path: "$class"
                }
            },
        ]);
        const user = users[0];
        if(user) {
            user.type = "teacher";
            return jsonResponse.success(user);
        }
        jsonResponse.notFound("Teacher not found.")
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}