import axios from "./instance";
import { AnnouncementClientData, AnnouncementFeed } from "@shared/Announcement";

export const createAnnouncement = async(data: AnnouncementClientData) => {
    const res = await axios.post("/api/announcement/create", data);
    return res.data as ApiResponse<AnnouncementClientData>;
}

export const getAnnouncements = async() => {
    const res = await axios.get("/api/announcement");
    return res.data as ApiResponse<AnnouncementFeed[]>
}