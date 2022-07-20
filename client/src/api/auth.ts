import { Student, StudentSignupData, Teacher, TeacherSignupData } from "@shared/User";
import axios from "./instance";


export const loginStudent = async(email: string, password: string) => {
    const res = await axios.post("/api/auth/login/student", {email, password});
    return res.data as ApiResponse<Student>;
}

export const loginTeacher = async(email: string, password: string) => {
    const res = await axios.post("/api/auth/login/teacher", {email, password});
    return res.data as ApiResponse<Teacher>;
}

export const signUpStudent = async(data: StudentSignupData, pfp: File) => {
    const _data: any = data
    const formData = new FormData();
    for(let key in _data){
        formData.append(key, _data[key]);
    }
    formData.append("pfp", pfp);
    const res = await axios.post("/api/auth/signup/student", formData);
    return res.data as ApiResponse<Student>;
}


export const signUpTeacher = async(data: TeacherSignupData, pfp: File) => {
    const _data: any = data
    const formData = new FormData();
    for(let key in _data){
        formData.append(key, _data[key]);
    }
    formData.append("pfp", pfp);
    const res = await axios.post("/api/auth/signup/teacher", formData);
    return res.data as ApiResponse<Teacher>;
}