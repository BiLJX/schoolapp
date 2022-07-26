import { AdminLayout } from "container/admin/Layout";
import AccountRequestPage from "pages/admin/AccountRequest/account-request-page";
import AdminClassPage from "pages/admin/Class/class-page";
import AdminLoginPage from "pages/admin/Login/login-page";
import LoginPage from "pages/Login/login-page";
import StudentLoginPage from "pages/Login/login-student-page";
import TeacherLoginPage from "pages/Login/login-teacher-page";
import SignupUpPage from "pages/Signup/signup-page";
import TeacherSignupPage from "pages/Signup/teacher-signup-page";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import { RootState } from "types/states";
import { UserAuthWrapper } from "./User-Auth-Wrapper";
import UserRoutes from "./UserRoutes";
import { useSocket } from "hooks/useSocket";
export default function App(){
    useSocket();
    return(
        <Routes>
            <Route path = "/*" element = {<UserRoutes />} />
            <Route path = "/admin" element = {<AdminLayout />}>
                <Route index element = {<Navigate to = "requests" />} />
                <Route path = "requests/*" element = {<AccountRequestPage />} />
                <Route path = "classes" element = {<AdminClassPage />} />
            </Route>
            <Route path = "/admin/login" element = {<AdminLoginPage/>} /> 
            <Route path = "/login" element = {<UserAuthWrapper />}>
                <Route index element = {<LoginPage />} />
                <Route path = "student" element = {<StudentLoginPage />} />
                <Route path = "teacher" element = {<TeacherLoginPage />} />
            </Route>
            <Route path = "/signup" element = {<UserAuthWrapper />}>
                <Route path = "student" element = {<SignupUpPage />} />
                <Route path = "teacher" element = {<TeacherSignupPage />} />
            </Route>
        </Routes>
    )
}