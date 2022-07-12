import { getCurrentAdmin } from "api/admin/admin";
import AdminLoginPage from "pages/admin/Login/login-page";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { adminSignIn } from "redux/Admin/adminActions";
import { RootState } from "types/states";
import AdminNav from "./Nav";
import "./scss/layout.scss"
export function AdminLayout(){
    const admin = useSelector((state: RootState)=>state.admin);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const getAdmin = async() => {
        const res = await getCurrentAdmin();
        if(!res.error) dispatch(adminSignIn(res.data));
        setLoading(false)
    }

    useEffect(()=>{
        getAdmin()
    }, [])

    if(loading) return <div>Loading...</div>

    if(!admin){
        return <AdminLoginPage />
    }
    return(
        <div className = "admin-app-container">
            <AdminNav />
            <main>
                <Outlet />
            </main>
        </div>
    )
}