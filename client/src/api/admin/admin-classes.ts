import axios from "../instance";
import { School, ClassSchema, ClassInfo } from "@shared/School";
import { Student } from "@shared/User";

export const getAdminClasses = async() => {
    const res = await axios.get("/api/admin/classes");
    return res.data as ApiResponse<ClassSchema[]>;
}

export const getAdminClassById = async(class_id: string) => {
    const res = await axios.get(`/api/admin/classes/${class_id}/info`);
    return res.data as ApiResponse<ClassInfo>;
}

export const getAdminClassStudents = async (class_id: string) => {
    const res = await axios.get(`/api/admin/classes/${class_id}/students`);
    return res.data as ApiResponse<Student[]>;
}

export const editClass = async(data: {grade: number, section: string, class_id: string}) => {
    const res = await axios.patch(`/api/admin/classes/${data.class_id}/update`, data);
    return res.data as ApiResponse;
}

export const addClass = async(data: {grade: number, section: string}) => {
    const res = await axios.put("/api/admin/class", data);
    return res.data as ApiResponse<ClassSchema>;
}

export const removeClass = async(class_id: string) => {
    const res = await axios.delete("/api/admin/class/"+class_id);
    return res.data as ApiResponse;
}