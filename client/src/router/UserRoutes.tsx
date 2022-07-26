import { Student, Teacher } from "@shared/User";
import { getInbox } from "api/inbox";
import { getCurrentUser } from "api/user";
import { toastError } from "components/Toast/toast";
import MobileNavWrapper from "container/mobile-layouts/nav-wrapper";
import HomePage from "pages/home/home-page";
import InboxPage from "pages/Inbox/inbox";
import LoginPage from "pages/Login/login-page";
import PostPage from "pages/Post/post-page";
import AccountReview from "pages/Review/account-review-page";
import { UploadPost } from "pages/upload/upload";
import UserPage from "pages/user/user-page";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { initInbox } from "redux/Inbox/inboxAction";
import { signInUser } from "redux/User/userActions";
import { RootState } from "types/states";

export default function UserRoutes(){
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState)=>state);
    const [loading, setIsLoading] = useState(true);
    const hasRan = useRef(false);
    const teacher = currentUser as Teacher
    const student = currentUser as Student
    const getUser = async() => {
        const res = await getCurrentUser();
        if(res.data) dispatch(signInUser(res.data));
        await fetchInbox()
        setIsLoading(false)
    }
    const fetchInbox = async() => {
        const res = await getInbox();
        if(res.error) toastError(res.message);
        dispatch(initInbox(res.data));
    }
    useEffect(()=>{
        if(hasRan.current) return;
        getUser()
        
        hasRan.current = true;
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
            <Route path = "/" element = {<MobileNavWrapper />}>
                {/* Main Routes */}
                <Route index element = {<HomePage />}/>
                <Route path = "explore" element = {<HomePage />}/>
                <Route path = "inbox" element = {<InboxPage />}/>
                <Route path = "profile" element = {<HomePage />}/>
                
            </Route>
            <Route path = "/upload" element = {<UploadPost />} />
            {/* Post */}
            <Route path = "/post/:post_id" element = {<PostPage />}/>
            <Route path = "/student/:user_id/*" element = {<UserPage type="student" />}/>
            <Route path = "/teacher/:user_id/*" element = {<UserPage type="teacher" />}/>
        </Routes>
    )
}