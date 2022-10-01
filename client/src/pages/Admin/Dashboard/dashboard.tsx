import { DashboardData } from "@shared/School";
import { getAdminDashboard } from "api/admin/admin-dashboard";
import AdminHeader from "components/header/admin-header/admin-header";
import { toastError } from "components/Toast/toast";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import { useState, useEffect } from "react"
import { ClipLoader } from "react-spinners";
import { ComparisionCard, TotalCard } from "./components";
import "./dashboard.scss"
import Notices from "./Notices/notices";
export default function DashboardPage(){
    const [dashboardData, setDashboardData] = useState<DashboardData>();
    const [loading, setLoading] = useState(true);
    const fetchDashboard = async() => {
        const res = await getAdminDashboard();
        setLoading(false)
        if(res.error) return toastError(res.message);
        setDashboardData(res.data);
    }
    useEffect(()=>{
        fetchDashboard()
    }, [])
    let Content: JSX.Element;
    if(loading) Content = <div style={{width: "100%"}} className="center"> <ClipLoader color="var(--text-secondary-alt)" /> </div>
    else Content = (
        <>
            <section className="left-section">
                <div className = "total-items-container">
                    <TotalCard label="Total Students" value={`${dashboardData?.total_students} Students`} />
                    <TotalCard label="Total Teachers" value={`${dashboardData?.total_teachers} Teachers`} />
                    <TotalCard label="Total Classes" value={`${dashboardData?.total_classes} Classes`} />
                </div>
                <Notices />
            </section>
            <aside className="right-section">
                {dashboardData && <ComparisionCard data={dashboardData} />}
            </aside>
        </>
    )
    return(
        <>
            <AdminHeader title = "Dashboard" sub_title="Analyze school's data" />
            <AdminMain className="admin-dashboard">
                {Content}
            </AdminMain>
        </>
    )
}