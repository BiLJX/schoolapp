import { Student, Teacher } from "@shared/User";
import { getCurrentUser } from "api/user";
import MobileNavWrapper from "container/mobile-layouts/nav-wrapper";
import HomePage from "pages/home/home-page";
import LoginPage from "pages/Login/login-page";
import PostPage from "pages/Post/post-page";
import AccountReview from "pages/Review/account-review-page";
import { UploadPost } from "pages/upload/upload";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { signInUser } from "redux/User/userActions";
import { RootState } from "types/states";

export default function UserRoutes(){
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState)=>state);
    const [loading, setIsLoading] = useState(true);
    const teacher = currentUser as Teacher
    const student = currentUser as Student
    const getUser = async() => {
        const res = await getCurrentUser();
        if(res.data) dispatch(signInUser(res.data));
        setIsLoading(false)
    }
    useEffect(()=>{
        getUser()
    }, []);

    if(loading) {
        return <span>Loading...</span>
    }

    if(!currentUser){
        return (
            <LoginPage />
        )
    }

    if(!(teacher.teacher_verified || student.student_verified)){
        return <AccountReview />
    }

    return(
        <Routes>
            <Route path = "/upload" element = {<UploadPost />} />
            <Route path = "/" element = {<MobileNavWrapper />}>
                {/* Main Routes */}
                <Route index element = {<HomePage />}/>
                <Route path = "explore" element = {<HomePage />}/>
                <Route path = "upload" element = {<HomePage />}/>
                <Route path = "inbox" element = {<HomePage />}/>
                <Route path = "profile" element = {<HomePage />}/>
                {/* Post */}
                <Route path = "post/:post_id" element = {<PostPage />}/>
            </Route>
        </Routes>
    )
}