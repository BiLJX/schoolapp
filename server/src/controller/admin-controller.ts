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


export namespace AdminUser {
    //get
    export const getStudentAccountRequests: Controller = async(req, res) => {
        const jsonResponse = new JsonResponse(res);
        const admin = res.locals.admin;
        try {
            const students = await Students.find({school_id: admin.school_id, student_verified: false}).lean();
            return jsonResponse.success(students)
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    }

    export const getTeacherAccountRequests: Controller = async(req, res) => {
        const jsonResponse = new JsonResponse(res);
        const admin = res.locals.admin;
        try {
            const teachers = await Teachers.find({school_id: admin.school_id, teacher_verified: false}).lean();
            return jsonResponse.success(teachers)
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    }

    //put
    export const approveStudentAccount: Controller = async (req, res) => {
        const jsonResponse = new JsonResponse(res);
        const admin = res.locals.admin;
        const user_id = req.params.user_id;
        const updated_data = req.body;
        try {
            if(updated_data){
                await Students.findOneAndUpdate({user_id, school_id: admin.school_id}, { 
                    $set: {
                        student_verified: true,
                        class_id: updated_data.class_id
                    }
                });
            }else{
                await Students.findOneAndUpdate({user_id, school_id: admin.school_id}, { 
                    $set: {
                        student_verified: true
                    }
                });
            }
            return jsonResponse.success("Student Approved")
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    }

    export const approveTeacherAccount: Controller = async (req, res) => {
        const jsonResponse = new JsonResponse(res);
        const admin = res.locals.admin;
        const user_id = req.params.user_id;
        try {
            await Teachers.findOneAndUpdate({user_id, school_id: admin.school_id}, { 
                $set: {
                    teacher_verified: true
                }
            });
            return jsonResponse.success("Teacher Approved")
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    }

    //delete
    export const rejectStudentAccount: Controller = async (req, res) => {
        const jsonResponse = new JsonResponse(res);
        const { school_id } = res.locals.admin;
        const user_id = req.params.user_id;
        try {
            const student = await Students.findOneAndDelete({user_id, school_id});
            if(student) await st.bucket().deleteFiles({ prefix: "user/"+student?.user_id });
            return jsonResponse.success("User rejected")
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    }
    
    export const rejectTeacherAccount: Controller = async (req, res) => {
        const jsonResponse = new JsonResponse(res);
        const { school_id } = res.locals.admin;
        const user_id = req.params.user_id;
        try {
            const teacher = await Teachers.findOneAndDelete({user_id, school_id});
            if(teacher) await st.bucket().deleteFiles({ prefix: "user/"+teacher?.user_id });
            return jsonResponse.success("User rejected")
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    }
}


