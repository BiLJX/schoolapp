import { Student, Teacher } from "@shared/User";
import axios from "./instance"

export const getCurrentUser = async() => {
    const res = await axios.get("/api/user/current");
    return res.data as ApiResponse<Student|Teacher|null>;
}