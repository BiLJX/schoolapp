import { School } from "@shared/School";
import { HeaderContainer } from "container/mobile-layouts/header-container";
import { useSelector } from "react-redux";
import { RootState } from "types/states";
import "./home-page.scss"
export default function HomePage(){
    const school = useSelector((state: RootState)=>state.currentUser?.school as School);
    return(
        <>
            <HeaderContainer>
                <div className = "nav-logo">
                    <img src = {school.logo_url} className = "full-img" />
                </div>
                <h1 className = "nav-title">{school.name}</h1>
            </HeaderContainer>
        </>
    )
}