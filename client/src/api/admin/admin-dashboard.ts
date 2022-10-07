import { Announcement } from "@shared/Announcement";
import { DashboardData } from "@shared/School";
import axios from "../instance";

export const getAdminDashboard = async() => {
    const res = await axios.get("/api/admin/dashboard");
    return res.data as ApiResponse<DashboardData>;
}

export const getAdminNotices = async() => {
    const res = await axios.get("/api/admin/dashboard/notices");
    return res.data as ApiResponse<Announcement[]>;
}

export const deleteAdminNotice = async(notice_id: string) => {
    const res = await axios.delete(`/api/admin/dashboard/notices/${notice_id}/delete`);
    return res.data as ApiResponse;
}