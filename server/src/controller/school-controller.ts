import { Request, Response } from "express";
import { Class } from "../models/Class";
import { Schools } from "../models/School";
import JsonResponse from "../utils/Response";


export const getSchools = async (req: Request, res: Response) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const classes = await Schools.find({}).lean().exec();
        jsonResponse.success(classes)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const getClasses = async (req: Request, res: Response) => {
    const jsonResponse = new JsonResponse(res);
    const school_id: string = req.params.school_id;
    try {
        const classes = await Class.find({school_id}).sort({grade: 1}).lean().exec();
        jsonResponse.success(classes)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}