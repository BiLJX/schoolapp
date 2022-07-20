import React from "react";
import "./scss/header-container.scss";
export function HeaderContainer({children}: {children: React.ReactNode}){
    return(
        <header className="mobile-header-container">
            {children}
        </header>
    )
}