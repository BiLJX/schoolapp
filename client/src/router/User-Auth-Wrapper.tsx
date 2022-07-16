import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "types/states";

export function UserAuthWrapper(){
    const { currentUser } = useSelector((state: RootState)=>state);
    if(currentUser){
        return(
            <Navigate to = "/" />
        )
    }
    return (
        <Outlet />
    )
}