import AdminHeader from "components/header/admin-header/admin-header";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import "./account-request-page.scss"
import { AccountItem, AccountsContainer } from "components/Admin-Accounts/admin-accounts";
import { useEffect, useState } from "react";
import { Student } from "@shared/User";
import { getStudentsAccountRequest } from "api/admin/admin-requests";
import { toastError } from "components/Toast/toast";
import { Route, Routes } from "react-router-dom";
import AdminAccountPreview from "components/Admin-Accounts/admin-account-preview";
export default function StudentAccountRequestsPage(){
    const [users, setUsers] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchItem = async () => {
        const res = await getStudentsAccountRequest();
        setLoading(false);
        if(res.error){
            return toastError(res.message)
        }
        setUsers(res.data);
    }
    useEffect(()=>{
        fetchItem()
    }, [])
    return(
        <>
            <AdminHeader title="Student's Account Requests" sub_title="Accept or decline student's accoount creation."/>
            <AdminMain className="account-request-page">
                <AccountsContainer>
                    {
                        users.map((x, i)=><AccountItem user={x} key = {i} />)
                    }
                </AccountsContainer>
                <Routes>
                    <Route path = ":id/preview" element = {<AdminAccountPreview />} />
                </Routes>
            </AdminMain>
        </>
    )
}
