import { useNavigate } from "react-router-dom";
import "./page.scss";
export default function AdminAnnouncementPage(){
    const navigate = useNavigate();
    return (
        <div className="admin-request-page">
            <header className="admin-header">
                <h1>Announcements</h1>
            </header>
            <section className = "admin-announcement">
                <div className = "admin-announcment-container">
                    <button className = "admin-announcement-add-button" onClick={()=>navigate("create")}>Add</button>
                </div>
            </section>
        </div>
    )
}