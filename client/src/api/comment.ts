import { Comment } from "@shared/Post"
import axios from "./instance"


export const getComment = async(post_id: string) => {
    const res = await axios.get("/api/comment/"+post_id);
    return res.data as ApiResponse<Comment[]>;
}

export const addComment = async(post_id: string, text: string) => {
    const res = await axios.post("/api/comment/add", {post_id, text})
    return res.data as ApiResponse<Comment>;
}

export const addReply = async (parent_id: string, text: string) => {
    const res = await axios.post("/api/comment/reply", {parent_id, text})
    return res.data as ApiResponse<Comment>;
}

export const likeComment = async (comment_id: string) => {
    const res = await axios.put("/api/comment/"+comment_id+"/like");
    return res.data as ApiResponse
}

export const unlikeComment = async (comment_id: string) => {
    const res = await axios.put("/api/comment/"+comment_id+"/unlike");
    return res.data as ApiResponse
}