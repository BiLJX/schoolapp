import axios from "./instance";

export interface TopStudent{
    full_name: string,
    user_id: string,
    profile_picture_url: string,
    merits_count: number,
    demerits_count: number,
    assignment_points: number
}
export interface SearchResult {
    full_name: string,
    user_id: string,
    profile_picture_url: string,
    merits_count: number,
    demerits_count: number,
    class: {
        grade: number,
        section: string
    },
    type: "student"|"teacher"
}
export const getTopStudents = async () => {
    const res = await axios.get("/api/explore/top");
    return res.data as ApiResponse<TopStudent[]>;
}
export const searchExplore = async (query: string) => {
    const res = await axios.get("/api/explore/search", {
        params: { s:query }
    })
    return res.data as ApiResponse<SearchResult[]>;
}