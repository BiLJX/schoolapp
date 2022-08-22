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
import AdminNavWrapper from "container/admin-layouts/admin-nav-wrapper";
import StudentAccountRequestsPage from "pages/Admin/student-account-request/student-account-requests";
import TeachersAccountRequestsPage from "pages/Admin/student-account-request/teacher-account-request";
export default function App(){
    useSocket();
    return(
        <Routes>
            <Route path = "/*" element = {<UserRoutes />} />
            <Route path = "/admin/*" element = {<AdminNavWrapper />}>
                <Route path = "requests/student/*" element = {<StudentAccountRequestsPage />}/>
                <Route path = "requests/teacher/*" element = {<TeachersAccountRequestsPage />}/>
                <Route path = "classes"/>
                <Route path = "announcement">
                    <Route index  />
                    <Route path="create" />
                </Route>
            </Route>
            <Route path = "/admin/login" /> 
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