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
        const user = req.body as Student;
        try {
            user.full_name = user.full_name.trim()
            user.email = user.email.toLowerCase().trim()
            //validations
            const nameValidation = validateFullName(user.full_name)
            const emailValidation = validateEmail(user.email);
            if(!nameValidation.success) return jsonResponse.clientError(nameValidation.message);
            if(!emailValidation.success) return jsonResponse.clientError(emailValidation.message);
            const student = await Students.findOneAndUpdate({user_id: user.user_id, school_id: admin.school_id}, { 
                $set: {
                    student_verified: true,
                    full_name: user.full_name,
                    email: user.email,
                    gender: user.gender,
                    class_id: user.class_id,
                    mothers_email: user.mothers_email,
                    fathers_email: user.fathers_email
                }
            });
            jsonResponse.success("Student Approved")
            if(student) await sendMail({
                to: student.email,
                subject: "Your Account has been approved",
                body: `Your account has been approved you can now login to your account`
            })
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    }

    export const approveTeacherAccount: Controller = async (req, res) => {
        const jsonResponse = new JsonResponse(res);
        const admin = res.locals.admin;
        const user = req.body as Teacher;
        try {
            const nameValidation = validateFullName(user.full_name)
            const emailValidation = validateEmail(user.email.trim());
            if(!nameValidation.success) return jsonResponse.clientError(nameValidation.message);
            if(!emailValidation.success) return jsonResponse.clientError(emailValidation.message);
            const teacher = await Teachers.findOneAndUpdate({user_id: user.user_id, school_id: admin.school_id}, { 
                $set: {
                    teacher_verified: true,
                    full_name: user.full_name.trim(),
                    email: user.email.trim(),
                    gender: user.gender,
                }
            });
            jsonResponse.success("Teacher Approved");
            if(teacher) await sendMail({
                to: teacher.email,
                subject: "Your Account has been accepted",
                body: `Your account has been accepted by admin. You can now login to your account`
            })
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
            jsonResponse.success("User rejected");
            if(student) await sendMail({
                to: student.email,
                subject: "Your Account has been rejected",
                body: `Your account has been rejected by admin. Please consult with your school admin about it.`
            })
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
            jsonResponse.success("User rejected")
            if(teacher) await sendMail({
                to: teacher.email,
                subject: "Your Account has been rejected",
                body: `Your account has been rejected by admin. Please consult with your school admin about it.`
            })
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    }
}


