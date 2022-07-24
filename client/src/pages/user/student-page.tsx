import { Student } from "@shared/User";
import Avatar from "components/Avatar/avatar";
import MobileStackHeader from "components/header/mobile-header";
import StackContainer from "container/mobile-layouts/stack-container";
import { useSelector } from "react-redux";
import { RootState } from "types/states";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
export default function StudentPage(){
    const currentUser = useSelector((state: RootState)=>state.currentUser) as Student;
    return(
        <>
            <MobileStackHeader label = {currentUser.full_name} />
            <StackContainer>
                <div className="user-page-info-container">
                    <div className = "user-page-info-left">
                        <Avatar src = {currentUser.profile_picture_url} style = {{ width: "80px", height: "80px" }} />
                    </div>
                    <div className = "user-page-info-right">
                        <div className = "user-fullname">{currentUser.full_name}</div>
                        <div className = "user-class">Class {currentUser.class.grade} {currentUser.class.section} Student</div>
                        <div className = "user-buttons">
                            <div className = "user-button merit">
                                <SentimentSatisfiedAltIcon />
                                1.1k
                            </div>
                            <div className = "user-button demerit">
                                <SentimentVeryDissatisfiedIcon />
                                1.2k
                            </div>
                        </div>
                    </div>
                </div>
            </StackContainer>
        </>
    )
}