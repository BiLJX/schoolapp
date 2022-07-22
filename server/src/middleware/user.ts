import { NextFunction, Request, Response } from "express";
import JsonResponse from "../utils/Response";
import jwt from "jsonwebtoken";
import { USER_PASSWORD_SECRET } from "../secret";
import { Student, Teacher } from "@shared/User";
import { Students } from "../models/Student";
import { Teachers } from "../models/Teacher";

export const UserAuth = async(req: Request, res: Response, next: NextFunction) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const session = req.cookies.user_session;
        if(!session) return jsonResponse.notAuthorized();
        const decodedData: any = jwt.verify(session, USER_PASSWORD_SECRET);
        let user: Student|Teacher|undefined;
        if(decodedData.type === "student"){
            const _user = await Students.aggregate([
                {
                    $match: {
                        user_id: decodedData.user_id
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
            user = _user[0];
            if(user) user.type = "student"
        }else {
            const _user = await Teachers.aggregate([
                {
                    $match: {
                        user_id: decodedData.user_id
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
            ]);
            user = _user[0];
            if(user) user.type = "teacher"
        }
        const student = user as Student;
        const teacher = user as Teacher;
        if(!user) return jsonResponse.notAuthorized();
        if(! (student.student_verified || teacher.teacher_verified)) return jsonResponse.clientError("Not verified", user)
        res.locals.user = user;
        next();
    } catch (error) {
        console.log(error)
        jsonResponse.serverError()
    }
}