import { AdminLayout } from "container/admin/Layout";
import AccountRequestPage from "pages/admin/AccountRequest/account-request-page";
import AdminClassPage from "pages/admin/Class/class-page";
import AdminLoginPage from "pages/admin/Login/login-page";
import LoginPage from "pages/Login/login-page";
import StudentLoginPage from "pages/Login/login-student-page";
import SignupUpPage from "pages/Signup/signup-page";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import { UserAuthWrapper } from "./User-Auth-Wrapper";
import UserRoutes from "./UserRoutes";
export default function App(){
    return(
        <Routes>

            <Route path = "/*" element = {<UserRoutes />} />
            <Route path = "/admin" element = {<AdminLayout />}>
                <Route index element = {<AccountRequestPage />} />
                <Route path = "classes" element = {<AdminClassPage />} />
            </Route>
            <Route path = "/admin/login" element = {<AdminLoginPage/>} /> 
            <Route path = "/login" element = {<UserAuthWrapper />}>
                <Route index element = {<LoginPage />} />
                <Route path = "student" element = {<StudentLoginPage />} />
            </Route>
            <Route path = "/signup" element = {<UserAuthWrapper />}>
                <Route path = "student" element = {<SignupUpPage />} />
                <Route path = "teacher" element = {<SignupUpPage />} />
            </Route>
            
        </Routes>
    )
}