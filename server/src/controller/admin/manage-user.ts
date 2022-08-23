import { Teachers } from "../../models/Teacher";
import { Controller } from "../../types/controller";
import JsonResponse from "../../utils/Response";
import { Students } from "../../models/Student";
import { Student, Teacher } from "@shared/User";
import { validateEmail, validateFullName } from "../../utils/validator";

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