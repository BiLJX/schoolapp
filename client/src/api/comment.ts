import { Comment } from "@shared/Post"
import axios from "./instance"

export const addComment = async(post_id: string, text: string) => {
    const res = await axios.post("/api/comment/add", {post_id, text})
    return res.data as ApiResponse<Comment>;
}