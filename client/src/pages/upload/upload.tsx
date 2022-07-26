import { FormInput, FormSelect, FormSelectData, FormSubmit } from "components/form/FormComponents";
import MobileStackHeader from "components/header/mobile-header";
import TextareaAutosize from 'react-textarea-autosize';
import StackContainer from "container/mobile-layouts/stack-container";
import { UploadCategory, UploadImage } from "./components";
import { useEffect, useState } from "react";
import { uploadPost } from "api/post";
import { ClientPostDataText, ClientPostDataImage } from "@shared/Post";
import { toastError } from "components/Toast/toast";
import { useNavigate } from "react-router-dom";
import SubjectIcon from '@mui/icons-material/Subject';
import "./scss/upload.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "types/states";
import { addFeed } from "redux/Feed/feedActions";

const POSTCATEGORIES = [
    "Nepali",
    "English",
    "Science",
    "Mathematics",
    "Social Studies",
    "Environment, Population and Health (EPH)",
    "Computing",
    "Suggestion",
    "Career",
    "Other"
]

export function UploadPost(){
    const feed = useSelector((state: RootState)=>state.feed)
    const [image, setImage] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<ClientPostDataText|ClientPostDataImage>({ title: "", category: "null", body: "", post_type: "text"})
    const [categories] = useState<FormSelectData[]>([{label: "Subject", value: "null"} ,...POSTCATEGORIES.map(x=>({label: x, value: x}))])
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const onPost = async() => {
        if(!POSTCATEGORIES.includes(data.category)) return toastError("Select a category")
        setIsLoading(true);
        const res = await uploadPost(data, image);
        if(res.error) {
            toastError(res.message);
            setIsLoading(false);
            return;
        }
        dispatch(addFeed([res.data, ...feed]))
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
            <MobileStackHeader goBack label="Upload a post" />
            <StackContainer className="upload-page">
                <UploadCategory onText={()=>setImage(undefined)} onImage = {(i)=>setImage(i)} />
                <TextareaAutosize placeholder="Write a title..." className = "upload-title" onChange={(e)=>setData({...data, title: e.target.value})} />
                {imageUrl && image?<UploadImage src = {imageUrl} />:<TextareaAutosize onChange={(e)=>setData({...data, body: e.target.value, post_type: "text"})} minRows={12} placeholder="Write a body for the post..." className="upload-body" />}
                <FormSelect data = {categories} Icon = {SubjectIcon} onChange = {(x)=>setData({...data, category: x})} />
                <div className = "upload-page-button-wrapper">
                    <FormSubmit label="Post" onClick={onPost} isLoading = {isLoading} />
                </div>
            </StackContainer>
        </>
    )
}