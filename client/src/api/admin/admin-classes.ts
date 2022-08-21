import axios from "../instance";
import { School, ClassSchema } from "@shared/School";

export const getAdminClasses = async() => {
    const res = await axios.get("/api/admin/classes");
    return res.data as ApiResponse<ClassSchema[]>;
}

export const addClass = async(data: {grade: number, section: string}) => {
    const res = await axios.put("/api/admin/class", data);
    return res.data as ApiResponse<ClassSchema>;
}

export const removeClass = async(class_id: string) => {
    const res = await axios.delete("/api/admin/class/"+class_id);
    return res.data as ApiResponse;
}