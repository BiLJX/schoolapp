import MobileSearchHeader from "components/header/mobile-search-header"
import StackContainer from "container/mobile-layouts/stack-container"
import { getTopStudents, TopStudent } from "api/explore"
import "./explore.scss"
import Avatar from "components/Avatar/avatar"
import { useEffect, useState } from "react"
import { toastError } from "components/Toast/toast"
import { NavLink, useNavigate } from "react-router-dom"
export default function ExplorePage(){
    const [topStudents, setTopStudents] = useState<TopStudent[]>([]);
    const navigate = useNavigate()
    const fetchTopStudent = async() => {
        const res = await getTopStudents();
        if(res.error){
            return toastError(res.message);
        }
        setTopStudents(res.data);
    }
    useEffect(()=>{
        fetchTopStudent()
    }, [])
    return(
        <>
            <MobileSearchHeader buttonLabel="Search" onSearch={(val)=>navigate("/explore/results?s="+val)} />
            <StackContainer className = "explore-items-container">
                <span className = "explore-items-title">Top Students</span>
                {
                    topStudents.map((x, i)=><ExploreItem data = {x} key = {i}/>)
                }
            </StackContainer>
        </>
    )
}

function ExploreItem({data}: {data: TopStudent}){
    return(
        <NavLink to = {"/student/"+data.user_id} className = "explore-item">
            <Avatar size={87} src = {data.profile_picture_url} style = {{ borderRadius: "10px" }} />
            <div className = "explore-item-info">
                <span className = "explore-item-name">{data.full_name}</span>
                <span className = "explore-item-stats">{data.merits_count} Merits</span>
                <span className = "explore-item-stats">{data.demerits_count} Demerits</span>
                <span className = "explore-item-stats" style = {{paddingBottom: "0"}}>{data.assignment_points} Assignment Points</span>
            </div>
        </NavLink>
    )
}