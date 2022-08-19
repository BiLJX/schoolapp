import { Announcement, AnnouncementFeed } from "@shared/Announcement";
import { getAnnouncements } from "api/announcement";
import MobileStackHeader from "components/header/mobile-header";
import { toastError } from "components/Toast/toast";
import StackContainer from "container/mobile-layouts/stack-container";
import moment from "moment";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { NavLink } from "react-router-dom";
import "./announcement.scss"
export default function AnnouncementPage(){
    const [feed, setFeed] = useState<AnnouncementFeed[]>([]);
    const fetchFeed = async() => {
        const res = await getAnnouncements();
        if(res.error){
            toastError(res.message)
        }
        setFeed(res.data);
    }
    useEffect(()=>{
        fetchFeed()
    }, [])
    return(
        <>
            <MobileStackHeader label = "Announcements" goBack />
            <StackContainer style = {{padding: "1rem"}}>
                {
                    feed.map((x, i)=><ItemsContainer data= {x} key = {i} />)
                }
            </StackContainer>
        </>
    )
}

function ItemsContainer({data}: {data: AnnouncementFeed}){
    return(
        <div className = "announcement-items-container">
            <div className = "announcement-date">{data.given_on}</div>
            {
                data.items.map((x, i)=><AnnouncementItem announcement={x} key = {i} />)
            }
        </div>
    )
}

function AnnouncementItem({announcement}: {announcement: Announcement}){
    const [openModal, setOpenModal] = useState(false)
    let Status: JSX.Element = <></>;
    // if(!announcement.has_read) Status = <div className = "announcement-item-status">Read</div>
    // else Status = <></>
    return(
        <>
            <AnnouncementContent isOpen = {openModal} onClose = {()=>setOpenModal(false)} data = {announcement} />
            <div className="announcement-item" onClick={()=>setOpenModal(true)}>
                <div className = "announcement-item-top">
                    <span>{announcement.title}</span>
                    {Status}
                </div>
                <div className = "announcement-item-description">{announcement.body}</div>
                <div className = "announcement-item-due">{moment(announcement.createdAt).format("MMMM Do YYYY") }</div>
            </div>
        </>
       
    )
}

interface ModalProps {
    isOpen: boolean,
    onClose: ()=>void,
    data: Announcement
}
function AnnouncementContent({
    isOpen,
    onClose,
    data
}: ModalProps){
    return (
        <ReactModal isOpen = {isOpen} className = "announcement-modal" overlayClassName = "modal-overlay">
            <h2>{data.title}</h2>
            <span>{data.body}</span>
            <button onClick={()=>onClose()}>Okay</button>
        </ReactModal>
    )
}