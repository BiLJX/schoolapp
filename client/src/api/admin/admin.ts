import axios from "../instance";
import { School, ClassSchema } from "@shared/School"
import { Student, Teacher } from "@shared/User";

export const adminLogin = async (school_name: string, password: string) => {
    const res = await axios.post("/api/auth/login/admin", { school_name, password });
    const response = res.data as ApiResponse<School>;
    return response;
}

export const getCurrentAdmin = async () => {
    const res = await axios.get("/api/admin/current");
    const response = res.data as ApiResponse<School>;
    return response;
}


export namespace Classes {

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
}

export namespace AdminRequests {
    export const getStudentsAccountRequest = async() => {
        const res = await axios.get("/api/admin/requests/students");
        return res.data as ApiResponse<Student[]> 
    }
    export const getTeachersAccountRequest = async() => {
        const res = await axios.get("/api/admin/requests/teachers");
        return res.data as ApiResponse<Teacher[]> 
    }
    export const approveStudent = async(user_id: string, class_id: string) => {
        const res = await axios.put(`/api/admin/requests/students/${user_id}/approve`, {class_id})
        return res.data as ApiResponse
    }
    export const approveTeacher = async(user_id: string) => {
        const res = await axios.put(`/api/admin/requests/teachers/${user_id}/approve`)
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
}

