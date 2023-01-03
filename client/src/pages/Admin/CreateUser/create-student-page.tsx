import AdminHeader from "components/header/admin-header/admin-header";
import AdminCardContainer from "container/Admin-Cards/admin-card";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import { Route, Routes } from "react-router-dom";
import CreateUserNav from "./components/nav-bar";
import "./create-user.scss";
import PersonalInformation from "./student-pages/personal-information";
const ItemNames = [
    {title:  "Personal Information", step: 1, is_active: true},
    {title:  "Parents Information", step: 2, is_active: false},
    {title: "Location and Address", step: 3, is_active: false},
    {title: "Transportation", step: 4, is_active: false},
    {title: "Meal Information", step : 5, is_active: false},
    {title: "Class", step: 6, is_active: false},
    {title: "Preview", step: 7, is_active: false}
]
export default function CreateStudentPage(){

    return(
        <>
            <AdminHeader title="Create Student" sub_title="Add information about the student and create." />
            <AdminMain className="center" style = {{height: "100vh"}}>
                <AdminCardContainer className = "admin-create-user-box">
                    <CreateUserNav items_names={ItemNames} />
                    <Routes>
                        <Route path = "1" element = {<PersonalInformation />} />
                    </Routes>
                </AdminCardContainer>
            </AdminMain>
            
        </>
        
    )
}