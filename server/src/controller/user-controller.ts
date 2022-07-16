import { Request, Response } from "express";
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