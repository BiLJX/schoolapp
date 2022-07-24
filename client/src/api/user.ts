import { Student, Teacher } from "@shared/User";
import axios from "./instance"

export const getCurrentUser = async() => {
    const res = await axios.get("/api/user/current");
    return res.data as ApiResponse<Student|Teacher|null>;
}

export const getStudentById = async(user_id: string) => {
    const res = await axios.get("/api/user/student/"+user_id);
    return res.data as ApiResponse<Student|null>;
}

export const getTeacherById = async(user_id: string) => {
    const res = await axios.get("/api/user/teacher/"+user_id);
    return res.data as ApiResponse<Teacher|null>;
}