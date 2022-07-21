import axios from "./instance";
import { ClientPostDataImage, ClientPostDataText } from "@shared/Post";

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