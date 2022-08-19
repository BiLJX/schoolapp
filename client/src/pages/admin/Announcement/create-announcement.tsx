import { AnnouncementClientData } from "@shared/Announcement";
import { createAnnouncement } from "api/announcement";
import { AdminInput } from "components/Admin/inputs";
import { toastError, toastSuccess } from "components/Toast/toast";
import { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
const defaultVal = {
    body: "",
    title: "",
    is_announced_to_students: true,
    is_announced_to_teachers: true
}
export default function CreateAnnouncementPage(){
    const [data, setData] = useState<AnnouncementClientData>(defaultVal)
    const create = async (e: any) => {
        e.preventDefault();
        if(!data.title) return toastError("Please add title");
        if(!data.body) return toastError("Please add body");
        const res = await createAnnouncement(data);
        if(res.error) return toastError(res.message);
        toastSuccess("Posted")
        setData(defaultVal)
    }
    return (
        <div className="admin-request-page">
            <header className="admin-header">
                <h1>Announcements</h1>
            </header>
            <section className = "admin-announcement">
                <form className = "admin-announcment-container" onSubmit={create}>
                    <AdminInput placeholder="Write a title..." label="Title" type="text" onChange={(title)=>setData({...data, title})} />
                    <div className="admin-input-container" style={{margin: "1rem 0"}}>
                        <div className="label">Body</div>
                        <ReactTextareaAutosize onChange={(e)=>setData({...data, body: e.target.value})} minRows={10} placeholder="Write a body..."/>
                    </div>
                    <button className = "admin-announcement-add-button">Post</button>
                </form>
            </section>
        </div>
    )
}