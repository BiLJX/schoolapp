import { DashboardData } from "@shared/School";
import { getAdminDashboard } from "api/admin/admin-dashboard";
import AdminHeader from "components/header/admin-header/admin-header";
import { toastError } from "components/Toast/toast";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import { useState, useEffect } from "react"
import { ComparisionCard, TotalCard } from "./components";
import "./dashboard.scss"
export default function DashboardPage(){
    const [dashboardData, setDashboardData] = useState<DashboardData>();
    const fetchDashboard = async() => {
        const res = await getAdminDashboard();
        if(res.error) return toastError(res.message);
        setDashboardData(res.data);
    }
    useEffect(()=>{
        fetchDashboard()
    }, [])
    return(
        <>
            <AdminHeader title = "Dashboard" sub_title="Analyze school's data" />
            <AdminMain className="admin-dashboard">
                <section className="left-section">
                    <div className = "total-items-container">
                        <TotalCard label="Total Students" value={`${dashboardData?.total_students} Students`} />
                        <TotalCard label="Total Teachers" value={`${dashboardData?.total_teachers} Teachers`} />
                        <TotalCard label="Total Classes" value={`${dashboardData?.total_classes} Classes`} />
                    </div>
                </section>
                <aside className="right-section">
                    {dashboardData && <ComparisionCard data={dashboardData} />}
                </aside>
            </AdminMain>
        </>
    )
}