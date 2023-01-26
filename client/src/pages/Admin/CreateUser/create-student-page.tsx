import { StudentParentsInformation, UserPersonalInformation } from "@shared/User";
import AdminHeader from "components/header/admin-header/admin-header";
import AdminCardContainer from "container/Admin-Cards/admin-card";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateUserNav from "./components/nav-bar";
import "./create-user.scss";
import LocationAndAddressPage from "./student-pages/location-page";
import ParentsInformationPage from "./student-pages/parents-information-page";
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

export interface ChildrenProps<T>{
    data: T,
    setData: (val: T) => void,
    next: () => void,
}
export default function CreateStudentPage(){
    const navigate = useNavigate();
    const [navItems, setNavItems] = useState(ItemNames);
    const [personalInformation, setPersonalInformation] = useState<UserPersonalInformation>({
        email: "",
        DOB: "",
        full_name: "",
        gender: "Male",
        nationality: "",
        phone_no: 98
    });
    const [parentsInformation, setParentsInformation] = useState<StudentParentsInformation>({
        mothers_name: "",
        fathers_name: "",
        fathers_contact_no: "",
        fathers_email: "",
        mothers_contact_no: "",
        mothers_email: ""
    })

    const activateStep = (step: number) => {
        const i = navItems.findIndex(x=>x.step === step);
        const newArr = [...navItems];
        newArr[i].is_active = true;
        setNavItems(newArr);
        navigate(step + "")
    }
    return(
        <>
            <AdminHeader title="Create Student" sub_title="Add information about the student and create." />
            <AdminMain className="center" style = {{height: "100vh"}}>
                <AdminCardContainer className = "admin-create-user-box">
                    <CreateUserNav items_names={navItems} />
                    <Routes>
                        <Route path = "1" element = {
                            <PersonalInformation 
                            data = {personalInformation} 
                            setData = {setPersonalInformation}
                            next = {()=>{activateStep(2)}} 
                            
                            />
                        } />
                        {navItems[1].is_active && <Route path = "2" element = {<ParentsInformationPage next={()=>{activateStep(3)}} data={parentsInformation} setData = {setParentsInformation} />} />}
                        {navItems[2].is_active && <Route path = "3" element = {<LocationAndAddressPage />} />}
                    </Routes>
                </AdminCardContainer>
            </AdminMain>
            
        </>
        
    )
}