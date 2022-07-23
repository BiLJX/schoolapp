import axios from "./instance";
import { ClientPostDataImage, ClientPostDataText, Post } from "@shared/Post";

export const getPostFeed = async() => {
    const res = await axios.get("/api/post/feed");
    return res.data as ApiResponse<Post[]>;
}

export const getPostById = async(id: string) => {
    const res = await axios.get("/api/post/"+id);
    return res.data as ApiResponse<Post>;
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

export const likePost = async(post_id: string) => {
    const res = await axios.put("/api/post/"+post_id+"/like");
    return res.data as ApiResponse;
}

export const unlikePost = async(post_id: string) => {
    const res = await axios.put("/api/post/"+post_id+"/unlike");
    return res.data as ApiResponse;
}