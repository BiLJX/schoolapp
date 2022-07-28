import { School, ClassSchema } from "./School"

interface User {
    user_id: string,
    full_name: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    email: string,
    school_id: string,
    profile_picture_url: string,
    password: string,
    school: School,
    email_verified: boolean,
    type: "student"|"teacher"
}

export interface Student extends User {
    class_id: string,
    student_verified: boolean,
    class: ClassSchema,
    type: "student",
    merits_count: number,
    demerits_count: number
}

export interface Teacher extends User {
    teacher_verified: boolean,
    type: "teacher"
}

export interface StudentSignupData {
    full_name: string,
    email: string,
    class_id: string,
    school_id: string,
    password: string,
}

export interface TeacherSignupData {
    full_name: string,
    email: string,
    school_id: string,
    password: string,
}
