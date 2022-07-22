import { AdminSearchBarButton } from "components/Admin/buttons"
import { useEffect, useState } from "react"
import { NavLink, Route, Routes } from "react-router-dom"
import { AdminRequests, Classes } from "api/admin/admin";
import { AccountRequestItem } from "./account-request-item"
import { FormSelectData } from "components/form/FormComponents";
import "./account-request.scss"
import { SearchComponent } from "./search-component"
import { Student, Teacher } from "@shared/User";
export default function AccountRequestPage(){
    const [classes, setClasses] = useState<FormSelectData[]>([]);
    const getClasses = async () => {
        const res = await Classes.getAdminClasses();
        if(res.error) return;
        setClasses([classes[0], ...res.data.map(x=>({ label: `${x.grade} ${x.section}`, value: x.class_id }))])
    }
    useEffect(()=>{
        getClasses()
    }, [])
    return (
        <div className="admin-request-page">
            <header className="admin-header">
                <h1>Account Creation Requests</h1>
                <div className="admin-header-nav">
                    <NavLink end to = "" className={(state)=>state.isActive?"active":""}>Student</NavLink>
                    <NavLink to = "teacher" className={(state)=>state.isActive?"active":""}>Teacher</NavLink>
                </div>
            </header>
            <div className = "admin-request-main-container">
                <div className = "admin-request-main-header">
                    <SearchComponent />
                    <AdminSearchBarButton label = "Search" />
                </div>
                <div className = "admin-request-items-container">
                    <Routes>
                        <Route index element = {<StudentsContainer classes = {classes} />} />
                        <Route path = "teacher" element = {<TeachersContainer />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

function StudentsContainer({classes}: {classes: FormSelectData[]}){
    const [students, setStudents] = useState<Student[]>([]);
    const getStudents = async() => {
        const res = await AdminRequests.getStudentsAccountRequest();
        if(res.error) return;
        setStudents(res.data)
    }
    useEffect(()=>{
        getStudents()
    }, [])
    return(
        <>
            {
                students.map((x, i)=><AccountRequestItem key = {i} user = {x} classes = {classes} />)
            }
        </>
    )
}

function TeachersContainer(){
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const getStudents = async() => {
        const res = await AdminRequests.getTeachersAccountRequest();
        if(res.error) return;
        setTeachers(res.data)
    }
    useEffect(()=>{
        getStudents()
    }, [])
    return(
        <>
            {
                teachers.map((x, i)=><AccountRequestItem key = {i} user = {x} classes = {[]} />)
            }
        </>
    )
}