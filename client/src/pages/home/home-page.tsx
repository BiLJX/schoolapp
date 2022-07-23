import { Post } from "@shared/Post";
import { School } from "@shared/School";
import { getPostFeed } from "api/post";
import PostCard from "components/post/post-card";
import PostSkeleton from "components/post/skeleton";
import { toastError } from "components/Toast/toast";
import { HeaderContainer } from "container/mobile-layouts/header-container";
import StackContainer from "container/mobile-layouts/stack-container";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "redux/Feed/feedActions";
import { RootState } from "types/states";
import "./home-page.scss"
export default function HomePage(){
    const school = useSelector((state: RootState)=>state.currentUser?.school as School);
    const feed = useSelector((state: RootState)=>state.feed);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);

    const scrollTo = () => {
        const scrollPos = sessionStorage.getItem("scrollPos");
        if(scrollPos){
            window.scrollTo(0, parseInt(scrollPos));
            sessionStorage.removeItem("scrollPos");
        }
    }

    useEffect(()=>{
        const getPost = async() => {
            if(feed.length) return; 
            setLoading(true)
            document.body.style.overflowY = "hidden";
            const res = await getPostFeed();
            if(res.error) return toastError(res.message);
            dispatch(addFeed(res.data));
            setLoading(false)
            document.body.style.overflowY = "visible";
        }
        getPost();
        scrollTo()
        return(()=>{
            window.sessionStorage.setItem("scrollPos", ""+window.scrollY)
        })
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
               {loading && (
                    <>
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                    </>
                )}
                {
                    feed.map((x, i)=><PostCard data = {x} key = {i} />)
                }
            </StackContainer>
        </>
    )
}