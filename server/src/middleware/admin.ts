import { NextFunction, Request, Response } from "express";
import JsonResponse from "../utils/Response";
import jwt from "jsonwebtoken";
import { SCHOOL_PASSWORD_SECRET } from "../secret";
import { Schools } from "../models/School";
export const AdminAuth = async (req: Request, res: Response, next: NextFunction) => {
    const jsonResponse = new JsonResponse(res);
    try{
        const session = req.cookies.session || req.headers.session;
        if(!session) return jsonResponse.notAuthorized();
        const verified: any = jwt.verify(session, SCHOOL_PASSWORD_SECRET);
        const school_id = verified.school_id;
        const school = await Schools.findOne({school_id}).select('-password');
        if(!school) return jsonResponse.notAuthorized()
        res.locals.admin = school.toJSON();
        next();
    }catch(err){
        console.log(err);
        jsonResponse.serverError()
    }
}