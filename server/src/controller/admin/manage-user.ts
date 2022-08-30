import { Teachers } from "../../models/Teacher";
import { Controller } from "../../types/controller";
import JsonResponse from "../../utils/Response";
import { Students } from "../../models/Student";
import { Student, Teacher } from "@shared/User";
import { validateEmail, validateFullName, validateGender, validatePassowrd } from "../../utils/validator";
import { UserSignupData } from "@shared/User";
import { upload, uploadFile } from "../../utils/upload";
import { Class } from "../../models/Class";
import { makeId } from "../../utils/idgen";
import bcrypt from "bcrypt"
import sharp from "sharp";

export const getAdminStudents: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const admin = res.locals.admin;
    try {
        const searchQuery = req.query.s || "";
        const students = await Students.aggregate([
            {
                $match: {
                    full_name: {$regex : searchQuery, $options: 'i'},
                    school_id: admin.school_id, 
                    student_verified: true
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $project: {
                    password: 0
                }
            }
        ])
        jsonResponse.success(students);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();        
    }
}

export const getAdminTeachers: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const admin = res.locals.admin;
    try {
        const searchQuery = req.query.s || "";
        const teachers = await Teachers.aggregate([
            {
                $match: {
                    full_name: {$regex : searchQuery, $options: 'i'},
                    school_id: admin.school_id, 
                    teacher_verified: true
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $project: {
                    password: 0
                }
            }
        ])
        jsonResponse.success(teachers);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();        
    }
}

export const updateTeacher: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const admin = res.locals.admin;
    const user = req.body as Teacher;
    try {
        const nameValidation = validateFullName(user.full_name)
        const emailValidation = validateEmail(user.email.trim());
        if(!nameValidation.success) return jsonResponse.clientError(nameValidation.message);
        if(!emailValidation.success) return jsonResponse.clientError(emailValidation.message);
        await Teachers.findOneAndUpdate({user_id: user.user_id, school_id: admin.school_id}, { 
            $set: {
                teacher_verified: true,
                full_name: user.full_name.trim(),
                email: user.email.trim(),
                gender: user.gender,
            }
        });
        jsonResponse.success("Teacher Updated");
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const updateStudent: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const admin = res.locals.admin;
    const user = req.body as Student;
    try {
        const nameValidation = validateFullName(user.full_name)
        const emailValidation = validateEmail(user.email.trim());
        if(!nameValidation.success) return jsonResponse.clientError(nameValidation.message);
        if(!emailValidation.success) return jsonResponse.clientError(emailValidation.message);
        await Students.findOneAndUpdate({user_id: user.user_id, school_id: admin.school_id}, { 
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
        jsonResponse.success("Student Updated");
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}

export const createStudent: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const admin = res.locals.admin;
    try {
        upload(req, res, async(err)=>{
            try {
                if(err) return jsonResponse.serverError();
                const data: UserSignupData = req.body;
                const files  = req.files as Express.Multer.File[];
                const pfp = files[0];
                if(!data) return jsonResponse.clientError("No informations provided");
                //reasign
                data.email = data.email.trim().toLocaleLowerCase();
                data.mothers_email = data.mothers_email.trim().toLocaleLowerCase();
                data.fathers_email = data.fathers_email.trim().toLocaleLowerCase();
                data.full_name = data.full_name.trim();
                //validations
                const nameValidation = validateFullName(data.full_name);
                const emailValidation = validateEmail(data.email);
                const mothersEmailValidation = validateEmail(data.mothers_email);
                const fathersEmailValidation = validateEmail(data.fathers_email);
                const passwordValidation = validatePassowrd(data.password);
                const genderValidation = validateGender(data.gender);
                if (!pfp.mimetype.includes("image")) return jsonResponse.clientError("Invalid file format")
                if(!nameValidation.success) return jsonResponse.clientError(nameValidation.message);
                if(!emailValidation.success) return jsonResponse.clientError(emailValidation.message);
                if(!mothersEmailValidation.success) return jsonResponse.clientError("Invalid mother's email");
                if(!fathersEmailValidation.success) return jsonResponse.clientError("Invalid father's email");
                if(!passwordValidation.success) return jsonResponse.clientError(passwordValidation.message);
                if(!genderValidation.success) return jsonResponse.clientError(genderValidation.message)
                const user = await Students.findOne({email: data.email});
                if(user !== null) return jsonResponse.clientError("Email address already in use");
                const _class = await Class.findOne({class_id: data.class_id}); 
                if(_class === null) return jsonResponse.clientError("The class does not exist");
                //save user
                const user_id = makeId();
                const buffer = await sharp(pfp.buffer).jpeg({ quality: 80 }).toBuffer()
                const url = await uploadFile({buffer, dir: `user/${user_id}/pfp/`});
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
                const student = new Students({
                    full_name: data.full_name,
                    email: data.email,
                    class_id: data.class_id,
                    school_id: admin.school_id,
                    password: data.password,
                    profile_picture_url: url,
                    gender: data.gender,
                    mothers_email: data.mothers_email,
                    user_id,
                    fathers_email: data.fathers_email,
                    email_verified: true,
                    student_verified: true
                });
                await student.save();
                return jsonResponse.success(student);
            } catch (error) {
                console.log(error);
                jsonResponse.serverError()
            }
        })
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const createTeacher: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const admin = res.locals.admin;
    try {
        upload(req, res, async(err)=>{
            try {
                if(err) return jsonResponse.serverError();
                const data: UserSignupData = req.body;
                const files  = req.files as Express.Multer.File[];
                const pfp = files[0];
                if(!data) return jsonResponse.clientError("No informations provided");
                //reasign
                data.email = data.email.trim().toLocaleLowerCase();
                data.full_name = data.full_name.trim();
                //validations
                const nameValidation = validateFullName(data.full_name);
                const emailValidation = validateEmail(data.email);
                const passwordValidation = validatePassowrd(data.password);
                const genderValidation = validateGender(data.gender);
                if (!pfp.mimetype.includes("image")) return jsonResponse.clientError("Invalid file format")
                if(!nameValidation.success) return jsonResponse.clientError(nameValidation.message);
                if(!emailValidation.success) return jsonResponse.clientError(emailValidation.message);
                if(!passwordValidation.success) return jsonResponse.clientError(passwordValidation.message);
                if(!genderValidation.success) return jsonResponse.clientError(genderValidation.message)
                const user = await Teachers.findOne({email: data.email});
                if(user !== null) return jsonResponse.clientError("Email address already in use");
                //save user
                const user_id = makeId();
                const buffer = await sharp(pfp.buffer).jpeg({ quality: 80 }).toBuffer()
                const url = await uploadFile({buffer, dir: `user/${user_id}/pfp/`});
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
                const teacher = new Teachers({
                    full_name: data.full_name,
                    email: data.email,
                    school_id: admin.school_id,
                    password: data.password,
                    profile_picture_url: url,
                    gender: data.gender,
                    user_id,
                    email_verified: true,
                    teacher_verified: true
                });
                await teacher.save();
                return jsonResponse.success(teacher);
            } catch (error) {
                console.log(error);
                jsonResponse.serverError()
            }
        })
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}