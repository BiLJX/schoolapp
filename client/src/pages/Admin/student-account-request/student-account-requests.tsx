import AdminHeader from "components/header/admin-header/admin-header";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import "./account-request-page.scss"
import { AccountItem, AccountsContainer } from "components/Admin-Accounts/admin-accounts";
import { useEffect, useState } from "react";
import { Student } from "@shared/User";
import { getStudentsAccountRequest } from "api/admin/admin-requests";
import { toastError } from "components/Toast/toast";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminAccountPreview from "components/Admin-Accounts/admin-account-preview";
import { User } from "types/user";
import { ClipLoader } from "react-spinners";
export default function StudentAccountRequestsPage(){
    const [users, setUsers] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const fetchItem = async () => {
        const res = await getStudentsAccountRequest();
        setLoading(false);
        if(res.error){
            return toastError(res.message)
        }
        setUsers(res.data);
    }
    const changeUser = async (user: User) => {
        const nextUser = users[users.findIndex(x=>x.user_id === user.user_id) + 1];
        if(nextUser){
            navigate(`${nextUser.user_id}/preview`, {state: nextUser});
        }
        setUsers(users.filter(x=>x.user_id !== user.user_id));
    }
    useEffect(()=>{
        fetchItem()
    }, [])
    return(
        <>
            <AdminHeader title="Student's Account Requests" sub_title="Accept or decline student's accoount creation."/>
            <AdminMain className="account-request-page">
                <AccountsContainer>
                {loading && <div className="center"> <ClipLoader color="var(--text-secondary-alt)" /> </div>}
                    {
                        users.map((x, i)=><AccountItem user={x} key = {i} />)
                    }
                </AccountsContainer>
                <Routes>
                    <Route path = ":id/preview" element = {<AdminAccountPreview onTaskComplete={changeUser} />} />
                </Routes>
            </AdminMain>
        </>
    )
}
