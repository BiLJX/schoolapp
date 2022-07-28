import { Request, Response } from "express";
import JsonResponse from "../utils/Response";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Schools } from "../models/School";
import { SCHOOL_PASSWORD_SECRET, USER_PASSWORD_SECRET } from "../secret";
import { upload, uploadFile } from "../utils/upload";
import { makeId } from "../utils/idgen";
import { StudentSignupData, TeacherSignupData } from "@shared/User"
import { validateEmail, validateFullName, validatePassowrd } from "../utils/validator";
import { Class } from "../models/Class";
import { Students } from "../models/Student";
import { Controller } from "../types/controller";
import { Teachers } from "../models/Teacher";
import { studentAggregation } from "../utils/aggregations";


const expiresIn = 60*60*24*14*1000;
const options = {maxAge: expiresIn, httpOnly: false};

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
        res.cookie("session", token, options);
        const data: any = school.toJSON();
        delete data.password;
        jsonResponse.success(data, "Scucessfully logged in");
    }catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const studentSignUp = async (req: Request, res: Response) => {
    const jsonResponse = new JsonResponse(res)
    upload(req, res, async err => {
        if(err) return jsonResponse.serverError();
        try {
            const data: StudentSignupData = req.body;
            const files: any  = req.files;
            const pfp = files[0];
            //reasign
            data.email = data.email.trim().toLowerCase();
            data.full_name = data.full_name.trim();
            //validations
            const nameValidation = validateFullName(data.full_name.trim().toLowerCase());
            const emailValidation = validateEmail(data.email);
            const passwordValidation = validatePassowrd(data.password);
            if (!pfp.mimetype.includes("image")) return jsonResponse.clientError("Invalid file format")
            if(!nameValidation.success) return jsonResponse.clientError(nameValidation.message);
            if(!emailValidation.success) return jsonResponse.clientError(emailValidation.message);
            if(!passwordValidation.success) return jsonResponse.clientError(passwordValidation.message);
            const user = await Students.findOne({email: data.email});
            if(user !== null) return jsonResponse.clientError("email address already in use");
            const school = await Schools.findOne({school_id: data.school_id});
            if(school === null) return jsonResponse.clientError("The School does not exist");
            const _class = await Class.findOne({class_id: data.class_id}); 
            if(_class === null) return jsonResponse.clientError("The class does not exist");
            //initializing user id
            const user_id = makeId();
            //uploading file
            const url = await uploadFile({buffer: pfp.buffer, dir: `user/${user_id}/pfp/`});
            //saving data
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
            const student = new Students({...data, profile_picture_url: url, user_id});
            await student.save()
            const token = jwt.sign({ user_id: student.user_id, type: "student" }, USER_PASSWORD_SECRET, { expiresIn: "10d" })
            res.cookie("user_session", token, options);
            const _user = await Students.aggregate(studentAggregation({ 
                $match: {
                    user_id: student.user_id
                }
            }));
            jsonResponse.success(_user[0])
        } catch (error) {
            console.log(error);
            jsonResponse.serverError();
        }
    })
}


export const studentLogin = async (req: Request, res: Response) => {
    const jsonResponse = new JsonResponse(res)
    try {
        const { email, password } = req.body;
        const user = await Students.aggregate(studentAggregation({
            $match: {
                email: email.toLowerCase()
            }
        }));
        if(user.length < 1) return jsonResponse.clientError("Student not found");
        const student: any = user[0];
        const result = await bcrypt.compare(password, student.password);
        if(!result) return jsonResponse.clientError("Invalid password");
        const token = jwt.sign({ user_id: student.user_id, type: "student" }, USER_PASSWORD_SECRET, { expiresIn: "10d" })
        res.cookie("user_session", token, options);
        delete student.password;
        jsonResponse.success(student, "successfully logged in")
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const teacherLogin: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res)
    try {
        const { email, password } = req.body;
        const user = await Teachers.aggregate([
            {
                $match: {
                    email: email.toLowerCase()
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
                $unwind: {
                    path: "$school"
                }
            },
        ]);
        if(user.length < 1) return jsonResponse.clientError("Teacher not found");
        const teacher: any = user[0];
        const result = await bcrypt.compare(password, teacher.password);
        if(!result) return jsonResponse.clientError("Invalid password");
        const token = jwt.sign({ user_id: teacher.user_id, type: "teacher" }, USER_PASSWORD_SECRET, { expiresIn: "10d" })
        res.cookie("user_session", token, options);
        delete teacher.password;
        jsonResponse.success(teacher, "successfully logged in")
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const teacherSignup: Controller = (req, res) => {
    const jsonResponse = new JsonResponse(res)
    upload(req, res, async err => {
        if(err) return jsonResponse.serverError();
        try {
            const data: TeacherSignupData = req.body;
            const files: any  = req.files;
            const pfp = files[0];
            //reasign
            data.email = data.email.trim().toLowerCase();
            //validations
            const nameValidation = validateFullName(data.full_name.trim().toLowerCase());
            const emailValidation = validateEmail(data.email);
            const passwordValidation = validatePassowrd(data.password);
            if (!pfp.mimetype.includes("image")) return jsonResponse.clientError("Invalid file format")
            if(!nameValidation.success) return jsonResponse.clientError(nameValidation.message);
            if(!emailValidation.success) return jsonResponse.clientError(emailValidation.message);
            if(!passwordValidation.success) return jsonResponse.clientError(passwordValidation.message);
            const user = await Teachers.findOne({email: data.email});
            if(user !== null) return jsonResponse.clientError("email address already in use");
            const school = await Schools.findOne({school_id: data.school_id});
            if(school === null) return jsonResponse.clientError("The School does not exist");
            //initializing user id
            const user_id = makeId();
            //uploading file
            const url = await uploadFile({buffer: pfp.buffer, dir: `user/${user_id}/pfp/`});
            //saving data
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
            data.full_name = data.full_name.trim()
            const teacher = new Teachers({...data, profile_picture_url: url, user_id});
            await teacher.save()
            const token = jwt.sign({ user_id: teacher.user_id, type: "teacher" }, USER_PASSWORD_SECRET, { expiresIn: "10d" })
            res.cookie("user_session", token, options);
            const _user = await Teachers.aggregate([
                {
                    $match: {
                        user_id: teacher.user_id
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
                    $project: {
                        password: 0
                    }
                },
                {
                    $unwind: {
                        path: "$school"
                    }
                },
            ]);
            jsonResponse.success(_user[0])
        } catch (error) {
            console.log(error);
            jsonResponse.serverError();
        }
    })
}