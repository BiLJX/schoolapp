import { getCurrentAdmin } from "api/admin/admin-auth";
import AdminNav from "components/nav/admin-nav/admin-nav";
import PreLoadPage from "pages/preload/preload";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { adminSignIn } from "redux/Admin/adminActions";
import { RootState } from "types/states";
import "./wrapper.scss"
export default function AdminNavWrapper(){
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
    if(loading) return <PreLoadPage />
    if(!admin) return <Navigate to = "/admin/login" />
    return(
        <div className = "admin-nav-wrapper">
            <AdminNav />
            <Outlet />
        </div>
    )
}

interface MainWrapperProps {
    className?: string,
    style?: React.CSSProperties,
    children: React.ReactNode
}
export function AdminMain({className, style, children}: MainWrapperProps){
    return(
        <main className={`admin-main-wrapper ${className || ""}`} style = {style}>
            {children}
        </main>
    )
}
