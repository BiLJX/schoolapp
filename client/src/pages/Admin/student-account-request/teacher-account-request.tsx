import AdminHeader from "components/header/admin-header/admin-header";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import "./account-request-page.scss"
import { AccountItem, AccountsContainer } from "components/Admin-Accounts/admin-accounts";
import { useEffect, useState } from "react";
import { Teacher } from "@shared/User";
import { getTeachersAccountRequest } from "api/admin/admin-requests";
import { toastError } from "components/Toast/toast";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminAccountPreview from "components/Admin-Accounts/admin-account-preview";
import { User } from "types/user";
import { ClipLoader } from "react-spinners";
export default function TeachersAccountRequestsPage(){
    const [users, setUsers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("")
    const navigate = useNavigate()
    const fetchItem = async () => {
        const res = await getTeachersAccountRequest(searchText);
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
    }, [searchText])
    return(
        <>
            <AdminHeader title="Teacher's Account Requests" sub_title="Accept or decline teacher's accoount creation."/>
            <AdminMain className="account-request-page">
                <AccountsContainer onSearch =  {s=>setSearchText(s)}>
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
