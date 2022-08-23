import { Students } from "../../models/Student";
import { Controller } from "../../types/controller";
import JsonResponse from "../../utils/Response";
import { Teachers } from "../../models/Teacher";
import { sendMail } from "../../utils/mail";
import { Student, Teacher } from "@shared/User";
import { validateEmail, validateFullName } from "../../utils/validator";
import admin from "firebase-admin";
const st = admin.storage()
export const getStudentAccountRequests: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const admin = res.locals.admin;
    try {
        const searchQuery = req.query.s || "";
        const students = await Students.aggregate([
            {
                $match: {
                    full_name: {$regex : searchQuery, $options: 'i'},
                    school_id: admin.school_id, 
                    student_verified: false
                }
            },
            {
                $project: {
                    password: 0
                }
            }
        ]);
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
        const searchQuery = req.query.s || "";
        const teachers = await Teachers.aggregate([
            {
                $match: {
                    full_name: {$regex : searchQuery, $options: 'i'},
                    school_id: admin.school_id, 
                    teacher_verified: false
                }
            },
            {
                $project: {
                    password: 0
                }
            }
        ]);
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
        const student = await Students.findOneAndDelete({user_id, school_id, student_verified: false});
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
        const teacher = await Teachers.findOneAndDelete({user_id, school_id, teacher_verified: false});
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