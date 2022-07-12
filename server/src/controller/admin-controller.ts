import { School } from "@shared/School";
import { Request, Response } from "express";
import { Schools } from "../models/School";
import JsonResponse from "../utils/Response";

export const getCurrentAdmin = async (req: Request, res: Response) => {
    const jsonResponse = new JsonResponse(res)
    try {
        const admin: School = res.locals.admin;
        jsonResponse.success(admin)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}