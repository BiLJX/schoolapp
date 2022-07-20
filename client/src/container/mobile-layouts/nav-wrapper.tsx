import { MobileNav } from "components/nav/mobile-nav";
import { Outlet } from "react-router-dom";

export default function MobileNavWrapper(){
    return(
        <>
            <section style = {{display: "flex", flexDirection: "column", paddingTop: "var(--header-height)"}}>
                <Outlet />
            </section>
            <MobileNav />
        </>
    )
}