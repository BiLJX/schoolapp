import axios from "./instance";

export interface TopStudent{
    full_name: string,
    user_id: string,
    profile_picture_url: string,
    merits_count: number,
    demerits_count: number,
    assignment_points: number
}
export const getTopStudents = async () => {
    const res = await axios.get("/api/explore/top");
    return res.data as ApiResponse<TopStudent[]>;
}