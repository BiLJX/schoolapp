import axios from "../instance";
import { Student, Teacher } from "@shared/User";

export const getStudentsAccountRequest = async() => {
    const res = await axios.get("/api/admin/requests/students");
    return res.data as ApiResponse<Student[]> 
}
export const getTeachersAccountRequest = async() => {
    const res = await axios.get("/api/admin/requests/teachers");
    return res.data as ApiResponse<Teacher[]> 
}
export const approveStudent = async(user: Student) => {
    const res = await axios.put(`/api/admin/requests/students/approve`, user)
    return res.data as ApiResponse
}
export const approveTeacher = async(user: Teacher) => {
    const res = await axios.put(`/api/admin/requests/teachers/approve`, user)
    return res.data as ApiResponse
}
export const rejectStudent = async(user_id: string) => {
    const res = await axios.delete(`/api/admin/requests/students/${user_id}/reject`)
    return res.data as ApiResponse
}
export const rejectTeacher = async(user_id: string) => {
    const res = await axios.delete(`/api/admin/requests/teachers/${user_id}/reject`)
    return res.data as ApiResponse
}