import { NextFunction, Request, Response } from "express";
import JsonResponse from "../utils/Response";
import jwt from "jsonwebtoken";
import { USER_PASSWORD_SECRET } from "../secret";
import { Student } from "@shared/User";
import { Students } from "../models/Student";

export const UserAuth = async(req: Request, res: Response, next: NextFunction) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const session = req.cookies.user_session;
        if(!session) return jsonResponse.notAuthorized()
        const decodedData: any = jwt.verify(session, USER_PASSWORD_SECRET);
        let user: Student|undefined;
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
                }
            ]);
            user = _user[0];
            if(user) user.type = "student"
        }
        if(!user) return jsonResponse.notAuthorized();
        if(!user.student_verified) return jsonResponse.clientError("Not verified", user)
        res.locals.user = user;
    } catch (error) {
        console.log(error)
        jsonResponse.serverError()
    }
}