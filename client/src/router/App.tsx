import LoginPage from "pages/Login/login-page";
import StudentLoginPage from "pages/Login/login-student-page";
import TeacherLoginPage from "pages/Login/login-teacher-page";
import SignupUpPage from "pages/Signup/signup-page";
import TeacherSignupPage from "pages/Signup/teacher-signup-page";
import { Route, Routes } from "react-router-dom";
import { UserAuthWrapper } from "./User-Auth-Wrapper";
import UserRoutes from "./UserRoutes";
import { useSocket } from "hooks/useSocket";
import AdminNavWrapper from "container/admin-layouts/admin-nav-wrapper";
import StudentAccountRequestsPage from "pages/Admin/student-account-request/student-account-requests";
import TeachersAccountRequestsPage from "pages/Admin/student-account-request/teacher-account-request";
import ManageTeacherPage from "pages/Admin/Manage/teacher";
import ManageStudentPage from "pages/Admin/Manage/student";
import AdminLoginPage from "pages/Admin/Login/admin-login";
import AdminClassPage from "pages/Admin/Class/class-page";
import ManageClassPage from "pages/Admin/Class/manage-class/manage-class";
import DashboardPage from "pages/Admin/Dashboard/dashboard";
import AdminSettingsPage from "pages/Admin/Settings/page";
import CreateStudentPage from "pages/Admin/CreateUser/create-student-page";
export default function App(){
    useSocket();
    return(
        <Routes>
            <Route path = "/*" element = {<UserRoutes />} />
            <Route path = "/admin/login" element = {<AdminLoginPage />} /> 
            <Route path = "/admin/*" element = {<AdminNavWrapper />}>
                <Route index element = {<DashboardPage />} />
                <Route path = "requests/student/*" element = {<StudentAccountRequestsPage />}/>
                <Route path = "requests/teacher/*" element = {<TeachersAccountRequestsPage />}/>
                <Route path = "classes/*">
                    <Route index element = {<AdminClassPage />} />
                    <Route path = ":class_id" element = {<ManageClassPage />} />
                </Route>
                <Route path = "manage">
                    <Route path = "teacher/*" element = {<ManageTeacherPage />} />
                    <Route path = "student/*" element = {<ManageStudentPage />} />
                </Route>
                <Route path = "create">
                    <Route path = "student/*" element = {<CreateStudentPage />} /> 
                </Route>
                <Route path = "settings/*" element = {<AdminSettingsPage />} />
            </Route>
            
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