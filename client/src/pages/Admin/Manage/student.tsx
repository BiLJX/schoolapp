import { Student, Teacher } from "@shared/User";
import { getAdminStudents, getAdminTeachers } from "api/admin/admin-manage-users";
import AdminHeader from "components/header/admin-header/admin-header";
import { toastError } from "components/Toast/toast";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { User } from "types/user";
import AdminManageContainer from "./components/container";
import { CreateUserButton, CreateUserModal } from "./global";
import "./manage.scss"
import "./components/component.scss"
import ManageHeader from "./components/header";
import { ItemLabelsStudent, StudentItem } from "./components/items";
export default function ManageStudentPage(){
    const [users, setUsers] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate()
    const fetchItem = async () => {
        const res = await getAdminStudents(searchText);
        setLoading(false);
        if(res.error){
            return toastError(res.message)
        }
        setUsers(res.data);
    }
    useEffect(()=>{
        fetchItem()
    }, [searchText])

    return(
        <>
            <AdminHeader title="Manage Students" sub_title="Change students information and details."/>
            <AdminMain className="manage-users-page center">
                <AdminManageContainer>
                    <ManageHeader />
                    <ItemLabelsStudent />
                    {
                        users && users.map((x, i)=><StudentItem student={x} key={i} />)
                    }
                </AdminManageContainer>
            </AdminMain>
        </>
    )
}