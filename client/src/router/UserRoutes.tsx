import { Student, Teacher } from "@shared/User";
import { getInbox } from "api/inbox";
import { getCurrentUser } from "api/user";
import { toastError } from "components/Toast/toast";
import MobileNavWrapper from "container/mobile-layouts/nav-wrapper";
import ExplorePage from "pages/explore/explore-page";
import SearchPage from "pages/explore/results-page";
import HomePage from "pages/home/home-page";
import ActivityPage from "pages/Inbox/activity/activity";
import AssignmentsPage from "pages/Inbox/assignment/assignment";
import ChangeStatusAssignment from "pages/Inbox/assignment/change-status/change-status";
import AssignmentContent from "pages/Inbox/assignment/content/assignment-content";
import AssignmentGivenPage from "pages/Inbox/assignment/given/assignment-given";
import InboxPage from "pages/Inbox/inbox";
import LoginPage from "pages/Login/login-page";
import PostPage from "pages/Post/post-page";
import PreLoadPage from "pages/preload/preload";
import AccountReview from "pages/Review/account-review-page";
import AssignPage from "pages/upload/assignment/assign-page";
import UploadAssignment from "pages/upload/assignment/assignment-page";
import UploadPage from "pages/upload/upload";
import { UploadPost } from "pages/upload/upload-post/upload-post";
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
        if(!res.error) await fetchInbox()
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
        return <PreLoadPage />
    }

    if(!currentUser?.user_id){
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
                <Route index element = {<HomePage />}/>
                <Route path = "explore">
                    <Route index element = {<ExplorePage />}/>
                    <Route path = "results" element = {<SearchPage />} />
                </Route>
                <Route path = "inbox" element = {<InboxPage />}/>
                <Route path = "profile" element = {<HomePage />}/>
            </Route>
            <Route path = "/upload/*">
                <Route index element = {<UploadPage />} />
                <Route path = "post" element = {<UploadPost />} />
                <Route path = "assignment" element = {<UploadAssignment />} />
                <Route path = "assignment/assign" element = {<AssignPage />} />
            </Route>
            <Route path = "/inbox/activity" element = {<ActivityPage />} />
            <Route path = "/inbox/assignment" element = {currentUser.type === "teacher"?<AssignmentGivenPage />:<AssignmentsPage />} /> 
            <Route path = "/inbox/assignment/:id/*" element = {<AssignmentContent />} /> 
            <Route path = "/inbox/assignment/:id/students" element = {<ChangeStatusAssignment />} /> 
            <Route path = "/post/:post_id" element = {<PostPage />}/>
            <Route path = "/student/:user_id/*" element = {<UserPage type="student" />}/>
            <Route path = "/teacher/:user_id/*" element = {<UserPage type="teacher" />}/>
        </Routes>
    )
}