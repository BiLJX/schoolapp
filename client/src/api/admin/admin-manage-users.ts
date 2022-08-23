import { Student, Teacher } from "@shared/User";
import axios from "../instance";

export const getAdminStudents = async(s: string) => {
    const res = await axios.get("/api/admin/manage/students", {params: {s}});
    return res.data as ApiResponse<Student[]>
}

export const getAdminTeachers = async(s: string) => {
    const res = await axios.get("/api/admin/manage/teachers", {params: {s}});
    return res.data as ApiResponse<Teacher[]>
}

export const updateTeacher = async(user: Teacher) => {
    const res = await axios.patch(`/api/admin/manage/teachers/update`, user)
    return res.data as ApiResponse
}

export const updateStudent = async(user: Student) => {
    const res = await axios.patch(`/api/admin/manage/students/update`, user)
    return res.data as ApiResponse
}