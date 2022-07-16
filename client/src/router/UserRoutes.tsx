import { Student, Teacher } from "@shared/User";
import { getCurrentUser } from "api/user";
import LoginPage from "pages/Login/login-page";
import AccountReview from "pages/Review/account-review-page";
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
            <Route index element = {<div></div>}/>
        </Routes>
    )
}