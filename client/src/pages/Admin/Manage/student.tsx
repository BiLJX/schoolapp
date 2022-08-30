import { Student, Teacher } from "@shared/User";
import { getAdminStudents, getAdminTeachers } from "api/admin/admin-manage-users";
import AdminAccountPreview from "components/Admin-Accounts/admin-account-preview";
import { AccountItem, AccountsContainer } from "components/Admin-Accounts/admin-accounts";
import AdminHeader from "components/header/admin-header/admin-header";
import { toastError } from "components/Toast/toast";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { User } from "types/user";
import { CreateUserButton, CreateUserModal } from "./global";
import "./manage.scss"
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
    const updateUsers = (user: User)=>{
        const index = users.findIndex(x=>x.user_id===user.user_id);
        const _users = [...users];
        _users[index] = user as Student;
        setUsers(_users)
    }
    useEffect(()=>{
        fetchItem()
    }, [searchText])

    return(
        <>
            {modalOpen && <CreateUserModal onComplete={(user)=>setUsers([user as Student, ...users])} type = "student" onClose={()=>setModalOpen(false)} />}
            <AdminHeader title="Manage Students" sub_title="Change students information and details."/>
            <AdminMain className="manage-users-page">
                <AccountsContainer onSearch={s=>setSearchText(s)}>
                    <CreateUserButton onClick={()=>setModalOpen(true)} />
                    {loading && <div className="center"> <ClipLoader color="var(--text-secondary-alt)" /> </div>}
                    {
                        users.map((x, i)=><AccountItem user={x} key = {i} />)
                    }
                </AccountsContainer>
                <Routes>
                    <Route path = ":id/preview" element = {<AdminAccountPreview manageUser onTaskComplete={updateUsers} />} />
                </Routes>
            </AdminMain>
        </>
    )
}