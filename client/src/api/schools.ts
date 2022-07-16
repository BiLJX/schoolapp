import axios from "./instance";
import { School, ClassSchema } from "@shared/School"

export const getSchools = async() => {
    const res = await axios.get(`/api/schools`);
    return res.data as ApiResponse<School[]>;
}

export const getClasses = async(school_id: string) => {
    const res = await axios.get(`/api/schools/${school_id}/classes`);
    return res.data as ApiResponse<ClassSchema[]>;
}
