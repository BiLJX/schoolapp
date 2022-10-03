import axios from "./instance";
import { Announcement, AnnouncementClientData, AnnouncementFeed } from "@shared/Announcement";

export const createAnnouncement = async(data: AnnouncementClientData) => {
    const res = await axios.post("/api/announcement/create", data);
    return res.data as ApiResponse<Announcement>;
}

export const getAnnouncements = async() => {
    const res = await axios.get("/api/announcement");
    return res.data as ApiResponse<AnnouncementFeed[]>
}