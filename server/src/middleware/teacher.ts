import { Teacher } from "@shared/User";
import { NextFunction, Request, Response } from "express";
import JsonResponse from "../utils/Response";

export const TeacherAuth = async(req: Request, res: Response, next: NextFunction) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const teacher = res.locals.user as Teacher;
        if(teacher.type === "teacher"){
            return next()
        }else {
            jsonResponse.notAuthorized()
        }
    } catch (error) {
        jsonResponse.serverError();
        console.log(error)
    }
}