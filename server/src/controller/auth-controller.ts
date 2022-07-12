import { Request, Response } from "express";
import JsonResponse from "../utils/Response";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Schools } from "../models/School";
import { SCHOOL_PASSWORD_SECRET } from "../secret";



export const adminLogin = async (req: Request, res: Response) => {
    interface ClientData {
        school_name: string,
        password: string
    }
    const jsonResponse = new JsonResponse(res)
    try{
        const body: ClientData = req.body;

        //finding school
        const school = await Schools.findOne({name: body.school_name});
        if(school === null) return jsonResponse.notFound("Couldnt Find Any School");

        //check password
        const result = await bcrypt.compare(body.password, school.password);
        if(!result) return jsonResponse.clientError("Invalid Password");
        
        //signing in
        const token = jwt.sign({school_id: school.school_id}, SCHOOL_PASSWORD_SECRET, {expiresIn: "10d"});
        res.cookie("session", token);
        const data: any = school.toJSON();
        delete data.password;
        jsonResponse.success(data, "Scucessfully logged in");
    }catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}