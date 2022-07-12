import { AdminLayout } from "container/admin/Layout";
import AccountRequestPage from "pages/admin/AccountRequest/account-request-page";
import AdminLoginPage from "pages/admin/Login/login-page";
import LoginPage from "pages/Login/login-page";
import StudentLoginPage from "pages/Login/login-student-page";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"
export default function App(){
    return(
        <Routes>
            <Route path = "/admin" element = {<AdminLayout />}>
                <Route index element = {<AccountRequestPage />} />
            </Route>
            <Route path = "/admin/login" element = {<AdminLoginPage/>} /> 

            <Route path = "/login" element = {<LoginPage />} />
            <Route path = "/login/student" element = {<StudentLoginPage />} />
        </Routes>
    )
}