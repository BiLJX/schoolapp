import { Student, Teacher } from "@shared/User";
import MobileStackHeader from "components/header/mobile-header";
import StackContainer from "container/mobile-layouts/stack-container";
import { useSelector } from "react-redux";
import { RootState } from "types/states";
import "./user-page.scss"
import { UserNav, UserPageInfo } from "./components";
import { useEffect, useState } from "react";
import { getStudentById, getTeacherById } from "api/user";
import { Route, Routes, useParams } from "react-router-dom";
import { toastError } from "components/Toast/toast";
import UserPosts from "./posts/user-posts";
import UserPerformance from "./performance/user-performance";
const studentNavData = [
    {to: "", label: "Posts", replace: false},
    {to: "performance", label: "Performance", replace: true},
    {to: "comments", label: "Comments", replace: true},
]
type User = Student|Teacher

interface UserPageProps {
    type: "student"|"teacher"
}
export default function UserPage({type}: UserPageProps){
    const user_id = useParams().user_id
    const currentUser = useSelector((state: RootState)=>state.currentUser) as User|null;
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState(false);
  
    const getUser = async() => {
        setLoading(true);
        if(!user_id) {
            setLoading(false)
            toastError("User not found");
            return;
        }
        if(user_id === currentUser?.user_id){
            setLoading(false)
            return setUser(currentUser);
        }
        const res = type === "student"?await getStudentById(user_id):await getTeacherById(user_id);
        if(res.error) {
            setLoading(false)
            return toastError(res.message);
        }
        setLoading(false)
        setUser(res.data);
    }
    
    useEffect(()=>{
        getUser()
    }, [])
    if(loading){
        return(
            <>
                <MobileStackHeader goBack label = "Loading" />
                <StackContainer className="user-page">

                </StackContainer>
            </>
        )
    }
    if(!user){
        return(
            <>
                <MobileStackHeader label = "User" goBack />
                <StackContainer className="user-page">
                    User not found :(
                </StackContainer>
            </>
        )
    }
    return(
        <>
            <MobileStackHeader goBack label = {user.full_name} />
            <StackContainer className="user-page">
                <UserPageInfo user = {user} />
                <UserNav data = {studentNavData} />
                <Routes>
                    <Route index element = {<UserPosts user = {user} />} />
                    <Route path = "performance" element = {<UserPerformance />} />
                </Routes>
            </StackContainer>
        </>
    )
}


