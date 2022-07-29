import { Student, Teacher } from "@shared/User";
import { useEffect, useState } from "react";
import { toastError } from "components/Toast/toast";
import { Post } from "@shared/Post";
import { getPostByUserId } from "api/post";
import PostSkeleton from "components/post/skeleton";
import PostCard from "components/post/post-card";
import { InformationError, NotFound } from "components/Error/error-component";

export default function UserPosts({user}: {user: Teacher|Student}){
    const [posts, setPosts] = useState<Post[]>([]);
    const [isFetchingPosts, setIsFetchingPosts] = useState(true);
    const getPosts = async() => {
        if(!user) return;
        const res = await getPostByUserId(user.user_id);
        if(res.error){
            setIsFetchingPosts(false)
            return toastError(res.message);
        }
        setIsFetchingPosts(false)
        setPosts(res.data)
    }

    useEffect(()=>{
        getPosts()
    }, [])
    
    if(isFetchingPosts){
        return(
            <div className = "user-posts-container">
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
            </div>
        )
    }

    if(!posts.length){
        return <InformationError title="User has not uploaded any posts" />
    }
    return(
        <div className = "user-posts-container">
            {posts.map((x, i)=><PostCard data={x} key = {i} />)}
        </div>
    )
}