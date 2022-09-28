import AdminHeader from "components/header/admin-header/admin-header";
import AdminCardContainer from "container/Admin-Cards/admin-card";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useState, useEffect } from "react"
import { getAdminClasses } from "api/admin/admin-classes";
import { toastError } from "components/Toast/toast";
import { ClassSchema } from "@shared/School";
import "./class.scss";
import { NavLink } from "react-router-dom";
import AddClassModal from "./modals/add-class";
export default function AdminClassPage(){
    const [classes, setClasses] = useState<ClassSchema[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fetchClasses = async () => {
        const res = await getAdminClasses();
        if(res.error) return toastError("Error while fetching classes");
        setClasses(res.data);
    }   
    useEffect(()=>{
        fetchClasses()
    }, [])
    return(
        <>
            {isModalOpen && <AddClassModal onClose={()=>setIsModalOpen(false)} onCreate = {(class_data)=>setClasses([class_data, ...classes])} />}
            <AdminHeader title="View Classes"  sub_title="View and manage school's classes" />
            <AdminMain className="admin-class-page">
                <AdminCardContainer className="admin-class-container">
                    <header className = "admin-class-container-header">
                        <h1>Classes</h1>
                        <div className = "add center" onClick={()=>setIsModalOpen(true)}><AddRoundedIcon /></div>
                    </header>
                    {
                        classes.map((x, i)=><ClassItem key = {i} data = {x} />)
                    }
                </AdminCardContainer>
            </AdminMain>
        </>
    )
}

function ClassItem({data}: {data: ClassSchema}){
    return(
        <NavLink className = "admin-class-item" to = {data.class_id}>
            <div className = "class-item-name">{`Class ${data.grade} (${data.section})`}</div>
            <div className = "class-item-students">{data.total_students} students</div>
            <div className = "class-item-next center"><NavigateNextRoundedIcon /></div>
        </NavLink>
    )
}