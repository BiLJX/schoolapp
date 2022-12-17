import AdminCardContainer from "container/Admin-Cards/admin-card";
import ManageHeader from "./header";

export default function AdminManageContainer({children}:{children: React.ReactNode}){
    return(
        <AdminCardContainer className="admin-manage-user-container">
            {children}
        </AdminCardContainer>
    )
}