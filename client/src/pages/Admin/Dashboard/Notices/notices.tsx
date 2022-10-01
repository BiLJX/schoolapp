import AdminCardContainer from "container/Admin-Cards/admin-card";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Announcement } from "@shared/Announcement";
import { useState, useEffect } from "react";
import "./notices.scss";
import { getAdminNotices } from "api/admin/admin-dashboard";
import { toastError } from "components/Toast/toast";
import { ClipLoader } from "react-spinners";
import moment from "moment";

export default function Notices(){
    const [notices, setNotices] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
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
                notices.map((x, i)=><NoticeItem data = {x} key =  {i}/>)
            }
        </section>       
    )
    return (
        <AdminCardContainer className="admin-notice-container">
            <header>
                <h1>Notices</h1>
                <div className = "icon center">
                    <AddRoundedIcon />
                </div>
            </header>
            
            {Content}
        </AdminCardContainer>
    )
}


function NoticeItem({data}: {data: Announcement}){
    let assignedTo: string;
    if(data.is_announced_to_students && data.is_announced_to_students) assignedTo = "All";
    else if(data.is_announced_to_students) assignedTo = "Students";
    else if(data.is_announced_to_teachers) assignedTo = "Teachers";
    else assignedTo = "None";
    return(
        <div className = "admin-notice-item">
            <div className = "notice-title">{data.title}</div>
            <div className = "notice-assigned">{assignedTo}</div>
            <div className = "notice-date">{moment(data.createdAt).format("Do MMM YYYY")}</div>
            <div className = "notice-icon">
                <NavigateNextRoundedIcon />
            </div>

        </div>
    )
}