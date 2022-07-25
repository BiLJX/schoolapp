import { NavLink } from "react-router-dom"
import { Student, Teacher } from "@shared/User";
import Avatar from "components/Avatar/avatar";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useSelector } from "react-redux";
import { RootState } from "types/states";

interface NavProps {
    data: Array<{to: string, label: string}>
}

export function UserNav({data}: NavProps){
    return(
        <nav className="user-nav">
            {data.map((x, i)=><NavLink end to = {x.to} className = "user-nav-item">{x.label}</NavLink>)}
        </nav>
    )
}

export function UserPageInfo({user}: {user: Student|Teacher}) {
    const viewer = useSelector((state: RootState)=>state.currentUser)
    let userClass: JSX.Element;
    let userButtons: JSX.Element;
    if(user.type === "student" && viewer?.type === "teacher"){
        userButtons = (
            <div className="user-buttons">
                <button className="user-button merit">
                    <SentimentSatisfiedAltIcon />
                    1.1k
                </button>
                <button className="user-button demerit">
                    <SentimentVeryDissatisfiedIcon />
                    1.2k
                </button>
            </div>
        )
    }else if(user.type === "student"){
        userButtons = (
            <div className="user-buttons">
                <div className="user-button merit">
                    <SentimentSatisfiedAltIcon />
                    1.1k
                </div>
                <div className="user-button demerit">
                    <SentimentVeryDissatisfiedIcon />
                    1.2k
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