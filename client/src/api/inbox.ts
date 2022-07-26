import { Inbox, Notification } from "@shared/Notification";
import axios from "./instance";

export const getInbox = async () => {
    const res = await axios.get("/api/inbox");
    return res.data as ApiResponse<Inbox>
}

export const getActivty = async () => {
    const res = await axios.get("/api/inbox/activity");
    return res.data as ApiResponse<Notification[]>;
}