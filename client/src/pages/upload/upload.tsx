import { FormInput, FormSubmit } from "components/form/FormComponents";
import MobileStackHeader from "components/header/mobile-header";
import TextareaAutosize from 'react-textarea-autosize';
import StackContainer from "container/mobile-layouts/stack-container";
import { UploadCategory, UploadImage } from "./components";
import "./scss/upload.scss";
import { useEffect, useState } from "react";
import { uploadPost } from "api/post";
import { ClientPostDataText, ClientPostDataImage } from "@shared/Post";
import { toastError } from "components/Toast/toast";
import { useNavigate } from "react-router-dom";


export function UploadPost(){
    const [image, setImage] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<ClientPostDataText|ClientPostDataImage>({ title: "", category: "Other", body: "", post_type: "text"})
    const navigate = useNavigate()
    const onPost = async() => {
        setIsLoading(true);
        const res = await uploadPost(data, image);
        if(res.error) toastError(res.message);
        setIsLoading(false);
        navigate("/");
    }

    useEffect(()=>{
        if(!image) return;
        const url = URL.createObjectURL(image);
        setImageUrl(url);
    }, [image])

    return(
        <>
            <MobileStackHeader label="Upload a post" />
            <StackContainer className="upload-page">
                <UploadCategory onText={()=>setImage(undefined)} onImage = {(i)=>setImage(i)} />
                <TextareaAutosize placeholder="Write a title..." className = "upload-title" onChange={(e)=>setData({...data, title: e.target.value})} />
                {imageUrl && image?<UploadImage src = {imageUrl} />:<TextareaAutosize onChange={(e)=>setData({...data, body: e.target.value, post_type: "text"})} minRows={15} placeholder="Write a body for the post..." className="upload-body" />}
                
                <div className = "upload-page-button-wrapper">
                    <FormSubmit label="Post" onClick={onPost} isLoading = {isLoading} />
                </div>
            </StackContainer>
        </>
    )
}