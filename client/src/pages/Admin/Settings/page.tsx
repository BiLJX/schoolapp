import AdminHeader from "components/header/admin-header/admin-header";
import AdminCardContainer from "container/Admin-Cards/admin-card";
import { AdminMain } from "container/admin-layouts/admin-nav-wrapper";
import EditSchool from "./EditSchool/page";
import AdminSettingsNav from "./nav";
import "./settings.scss";

export default function AdminSettingsPage(){
    return(
        <>
            <AdminHeader title = "Settings" sub_title="Change Settings of the app and school" />
            <AdminMain style={{display: "flex", justifyContent: "center"}}>
                <AdminCardContainer className="admin-settings-container">
                    <AdminSettingsNav />
                    <EditSchool />
                </AdminCardContainer>
            </AdminMain>
        </>
    )
}
