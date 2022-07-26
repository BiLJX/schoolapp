import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { RootState } from "types/states";
import Cookies from "js-cookie"
import { Notification } from "@shared/Notification"
const Socket = () => io({
    query: {
        token: Cookies.get("user_session")
    }
});
export const useSocket = () => {
    const user = useSelector((state: RootState)=>state.currentUser);
    useEffect(()=>{
        if(!user) return;
        const socket = Socket()
        socket.on("newNotification", (data: Notification)=>{
            console.log(data)
        })
        return () =>{socket.disconnect()}
    }, [user])
}