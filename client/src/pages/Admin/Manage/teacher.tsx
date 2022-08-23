import { Teacher } from "@shared/User";
import { getAdminTeachers } from "api/admin/admin-manage-users";
import AdminAccountPreview from "components/Admin-Accounts/admin-account-preview";
import { AccountItem, AccountsContainer } from "components/Admin-Accounts/admin-accounts";
import AdminHeader from "components/header/admin-header/admin-header";
import { toastError } from "components/Toast/toast";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { User } from "types/user";
import "./manage.scss"
export default function ManageTeacherPage(){
    const [users, setUsers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("")
    const navigate = useNavigate()
    const fetchItem = async () => {
        const res = await getAdminTeachers(searchText);
        setLoading(false);
        if(res.error){
            return toastError(res.message)
        }
        setUsers(res.data);
    }
    const updateUsers = (user: User)=>{
        const index = users.findIndex(x=>x.user_id===user.user_id);
        const _users = [...users];
        _users[index] = user as Teacher;
        setUsers(_users)
    }
    useEffect(()=>{
        fetchItem()
    }, [searchText])

    return(
        <>
            <AdminHeader title="Manage Teachers" sub_title="Change teachers information and details."/>
            <AdminMain className="manage-users-page">
                <AccountsContainer onSearch={s=>setSearchText(s)}>
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