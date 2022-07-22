import { Post } from "@shared/Post";
import { School } from "@shared/School";
import { getPostFeed } from "api/post";
import PostCard from "components/post/post-card";
import { toastError } from "components/Toast/toast";
import { HeaderContainer } from "container/mobile-layouts/header-container";
import StackContainer from "container/mobile-layouts/stack-container";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "types/states";
import "./home-page.scss"
export default function HomePage(){
    const school = useSelector((state: RootState)=>state.currentUser?.school as School);
    const [feed, setFeed] = useState<Post[]>([])
    useEffect(()=>{
        const getPost = async() => {
            const res = await getPostFeed();
            if(res.error) return toastError(res.message);
            setFeed(res.data);
        }
        getPost()
    }, [])
    return(
        <>
            <HeaderContainer>
                <div className = "nav-logo">
                    <img src = {school.logo_url} className = "full-img" />
                </div>
                <h1 className = "nav-title">{school.name}</h1>
            </HeaderContainer>
            <StackContainer className="home-posts-container">
                {
                    feed.map((x, i)=><PostCard data = {x} key = {i} />)
                }
            </StackContainer>
        </>
    )
}