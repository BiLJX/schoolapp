import MobileSearchHeader from "components/header/mobile-search-header"
import StackContainer from "container/mobile-layouts/stack-container"
import { getTopStudents, searchExplore, SearchResult, TopStudent } from "api/explore"
import "./explore.scss"
import Avatar from "components/Avatar/avatar"
import { useEffect, useState } from "react"
import { toastError } from "components/Toast/toast"
import { NavLink, useNavigate, useSearchParams } from "react-router-dom"
export default function SearchPage(){
    const [searchParams] = useSearchParams();
    const [topStudents, setTopStudents] = useState<SearchResult[]>([]);
    const text = searchParams.get("s");
    const navigtate = useNavigate();
    const fetchStudent = async() => {
        if(!text) return;
        const res = await searchExplore(text);
        if(res.error){
            return toastError(res.message);
        }
        setTopStudents(res.data);
    }
    useEffect(()=>{
        fetchStudent()
    }, [text])
    return(
        <>
            <MobileSearchHeader goBack buttonLabel="Search" onSearch={(val)=>navigtate("/explore/results?s="+val)}/>
            <StackContainer className = "explore-items-container">
                <span className = "explore-items-title">Results</span>
                {
                    topStudents.map((x, i)=><SearchItem data = {x} key = {i}/>)
                }
            </StackContainer>
        </>
    )
}

function SearchItem({data}: {data: SearchResult}){
    let Info: JSX.Element;
    if(data.type === "teacher"){
        Info = (
            <>
                <span className = "explore-item-name">{data.full_name}</span>
                <span className = "explore-item-stats" style = {{paddingBottom: "0"}}>Teacher</span>
            </>
        )
    }else{
        Info = (
            <>
                <span className = "explore-item-name">{data.full_name}</span>
                <span className = "explore-item-stats">{data.merits_count} Merits</span>
                <span className = "explore-item-stats">{data.demerits_count} Demerits</span>
                <span className = "explore-item-stats" style = {{paddingBottom: "0"}}>Class {data.class.grade} {data.class.section}</span>
            </>
        )
    }
    return(
        <NavLink to = {`/${data.type }/${data.user_id}`} className = "explore-item">
            <Avatar size={87} src = {data.profile_picture_url} style = {{ borderRadius: "10px" }} />
            <div className = "explore-item-info">
                {Info}
            </div>
        </NavLink>
    )
}