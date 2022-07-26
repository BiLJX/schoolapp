import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { RootState } from "types/states";
import Cookies from "js-cookie"
import { Notification } from "@shared/Notification"
import { newNotification } from "redux/Inbox/inboxAction";
const Socket = () => io({
    query: {
        token: Cookies.get("user_session")
    }
});
export const useSocket = () => {
    const user = useSelector((state: RootState)=>state.currentUser);
    const dispatch = useDispatch()
    useEffect(()=>{
        if(!user) return;
        const socket = Socket()
        socket.on("newNotification", (data: Notification)=>{
            dispatch(newNotification(data));
        })
        return () =>{socket.disconnect()}
    }, [user])
}