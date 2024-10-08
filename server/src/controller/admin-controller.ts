import { School } from "@shared/School";
import { Request, Response } from "express";
import { Class } from "../models/Class";
import { Schools } from "../models/School";
import { Students } from "../models/Student";
import { Controller } from "../types/controller";
import { makeId } from "../utils/idgen";
import JsonResponse from "../utils/Response";
import admin from "firebase-admin";
import { Teachers } from "../models/Teacher";
import { sendMail } from "../utils/mail";
import { Student, Teacher } from "@shared/User";
import { validateEmail, validateFullName } from "../utils/validator";

const st = admin.storage()

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



export namespace Classes {

    export const getClasses = async (req: Request, res: Response) => {
        const jsonResponse = new JsonResponse(res);
        try {
            const admin: School = res.locals.admin;
            const classes = await Class.aggregate([
                {
                    $match: {
                        school_id: admin.school_id
                    }
                },
                {
                    $sort: {
                        grade: 1
                    }
                }
            ]);
            return jsonResponse.success(classes);
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    }

    export const addClasses = async (req: Request, res: Response) => {
        const jsonResponse = new JsonResponse(res);
        const { grade, section }: { grade: number, section: string } = req.body;
        try {
            if( typeof grade !== "number" ) return jsonResponse.clientError("Classes must be a number");
            const admin: School = res.locals.admin;
            const _class = new Class({
                class_id: makeId(),
                school_id: admin.school_id,
                grade,
                section
            })
            await _class.save();
            jsonResponse.success(_class.toJSON(), "successfully created new class");
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    }

    export const removeClass = async (req: Request, res: Response) => {
        const jsonResponse = new JsonResponse(res);
        const class_id = req.params.class_id
        try {
            await Class.findOneAndDelete({class_id});
            jsonResponse.success({}, "successfully removed class")
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    }

}

