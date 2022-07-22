import axios from "./instance";
import { ClientPostDataImage, ClientPostDataText, Post } from "@shared/Post";

export const getPostFeed = async() => {
    const res = await axios.get("/api/post/feed");
    return res.data as ApiResponse<Post[]>;
}

export const uploadPost = async(data: ClientPostDataImage|ClientPostDataText, picture?: File) => {
    const _data: any = data
    const formData = new FormData();
    for(let key in _data){
        formData.append(key, _data[key]);
    }
    if(picture) formData.append("picture", picture);
    const res = await axios.post("/api/post/upload", formData);
    return res.data as ApiResponse<{post_id: string}>;
}