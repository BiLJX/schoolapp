import AdminCardContainer from "container/Admin-Cards/admin-card";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Announcement } from "@shared/Announcement";
import { useState, useEffect } from "react";
import { getAdminNotices } from "api/admin/admin-dashboard";
import { toastError } from "components/Toast/toast";
import { ClipLoader } from "react-spinners";
import moment from "moment";
import "./notices.scss";
import { AddNoticeModal } from "./add-notice";
import NoticeContentModal from "./content-modal";

export default function Notices(){
    const [notices, setNotices] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [addNoticeOpen, setAddNoticeOpen] = useState(false);
    const [currentNotice, setCurrentNotice] = useState<Announcement|null>(null);
    const openNotice = (notice: Announcement) => {
        setCurrentNotice(notice);
    }
    const closeNotice = () => {
        setCurrentNotice(null);
    }
    const deleteNotice = (notice_id: string) => {
        setNotices(notices.filter(x=>x.announcement_id !== notice_id));
    }
    const fetchNotices = async() => {
        const res = await getAdminNotices();
        setLoading(false);
        if(res.error) return toastError("Error while fetching notices.");
        setNotices(res.data);
    }
    useEffect(()=>{
        fetchNotices()
    }, [])
    let Content: JSX.Element;
    if(loading) Content = <div className="center"><ClipLoader color="var(--text-secondary-alt)" /></div>
    else Content = (
        <section className="notice-items-container">
            {
                notices.map((x, i)=><NoticeItem onClick={openNotice} data = {x} key =  {i}/>)
            }
        </section>       
    )
    return (
        <AdminCardContainer className="admin-notice-container">
            {addNoticeOpen && <AddNoticeModal onClose={()=>setAddNoticeOpen(false)} onNoticeAdded = {data=>setNotices([data, ...notices])} />}
            {currentNotice && <NoticeContentModal onDelete = {deleteNotice} data = {currentNotice} onClose = {closeNotice} />}
            <header>
                <h1>Notices</h1>
                <div className = "icon center" onClick={()=>setAddNoticeOpen(true)}>
                    <AddRoundedIcon />
                </div>
            </header>
            
            {Content}
        </AdminCardContainer>
    )
}


function NoticeItem({data, onClick}: {data: Announcement, onClick: (notice: Announcement)=>void}){
    let assignedTo: string;
    if(data.is_announced_to_students && data.is_announced_to_students) assignedTo = "All";
    else if(data.is_announced_to_students) assignedTo = "Students";
    else if(data.is_announced_to_teachers) assignedTo = "Teachers";
    else assignedTo = "None";
    return(
        <div className = "admin-notice-item" onClick={()=>onClick(data)}>
            <div className = "notice-title">{data.title}</div>
            <div className = "notice-assigned">{assignedTo}</div>
            <div className = "notice-date">{moment(data.createdAt).format("Do MMM YYYY")}</div>
            <div className = "notice-icon">
                <NavigateNextRoundedIcon />
            </div>
        </div>
    )
}