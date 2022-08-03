import { NavLink } from "react-router-dom"
import { Student, Teacher } from "@shared/User";
import Avatar from "components/Avatar/avatar";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useSelector } from "react-redux";
import { RootState } from "types/states";
import ReactModal from "react-modal";
import ReactTextareaAutosize from "react-textarea-autosize";
import ShortTextIcon from '@mui/icons-material/ShortText';
import { useState } from "react";
import { giveInteraction } from "api/interaction";
import { toastError, toastSuccess } from "components/Toast/toast";
interface NavProps {
    data: Array<{to: string, label: string, replace?: boolean}>,
}

export function UserNav({data}: NavProps){
    return(
        <nav className="user-nav">
            {data.map((x, i)=><NavLink end replace = {x.replace} to = {x.to} className = "user-nav-item">{x.label}</NavLink>)}
        </nav>
    )
}

export function UserPageInfo({user}: {user: Student|Teacher}) {
    const viewer = useSelector((state: RootState)=>state.currentUser);
    const [showModal, setShowModal] = useState<{state: boolean, type: "merit"|"demerit"}>({ state: false, type: "merit" })
    let userClass: JSX.Element;
    let userButtons: JSX.Element;
    if(user.type === "student" && viewer?.type === "teacher"){
        userButtons = (
            <>
                <InteractionModal given_to={user.user_id} onClose = {()=>setShowModal({...showModal, state: false})} isOpen = {showModal.state} type = {showModal.type} />
                <div className="user-buttons">
                    <button className="user-button merit" onClick={()=>setShowModal({state: true, type: "merit"})}>
                        <SentimentSatisfiedAltIcon />
                        {user.merits_count}
                    </button>
                    <button className="user-button demerit" onClick={()=>setShowModal({state: true, type: "demerit"})}>
                        <SentimentVeryDissatisfiedIcon />
                        {user.demerits_count}
                    </button>
                </div>
            </>
            
        )
    }else if(user.type === "student"){
        userButtons = (
            <div className="user-buttons">
                <div className="user-button merit">
                    <SentimentSatisfiedAltIcon />
                    {user.merits_count}
                </div>
                <div className="user-button demerit">
                    <SentimentVeryDissatisfiedIcon />
                    {user.demerits_count}
                </div>
            </div>
        )
    }else if(user.type === "teacher"){
        userButtons = <></>;
    }else {
        userButtons = <></>;
    }
    
    if(user.type === "student") userClass = <div className="user-class">Class {user.class.grade} {user.class.section} Student</div>;
    else userClass = <div className="user-class">Teacher</div>;
    return (
        <div className="user-page-info-container">
            <div className="user-page-info-left">
                <Avatar src={user.profile_picture_url} style={{ width: "80px", height: "80px" }} />
            </div>
            <div className="user-page-info-right">
                <div className="user-fullname">{user.full_name}</div>
                {userClass}
                {userButtons}
            </div>
        </div>
    )
}

function InteractionModal({given_to, isOpen, type, onClose}: {given_to:string, isOpen: boolean, onClose: ()=>any,type: "merit"|"demerit"}){
    const [reason, setReason] = useState("");
    const [giving, setGiving] = useState(false)
    const give =async () =>{
        if(giving) return;
        setGiving(true)
        const res = await giveInteraction({ given_to, reason, type });
        if(res.error) {
            setGiving(false)
            return toastError(res.message);
        }
        toastSuccess(res.message);
        setGiving(false)
        onClose()
    }
    return(
        <ReactModal overlayClassName="modal-overlay" className = "user-interaction-modal" isOpen = {isOpen}>
            <div className = "user-interaction-modal-reason">
                <div className = "reason-icon">
                    <ShortTextIcon />
                </div>
                <ReactTextareaAutosize onChange = {(e)=>setReason(e.target.value)} minRows={10} className = "reason-input" placeholder={"Reason for "+type} />
            </div>
            <div className = "user-interaction-modal-buttons">
                <button className = "user-interaction-button" onClick={give}>{giving?"giving":"Give"}</button>
                <button className = "user-interaction-button cancel" onClick = {onClose}>Cancel</button>
            </div>
        </ReactModal>
    )
}