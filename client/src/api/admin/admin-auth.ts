import axios from "../instance";
import { School } from "@shared/School"

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