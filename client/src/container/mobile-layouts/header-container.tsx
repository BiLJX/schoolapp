import React from "react";
import "./scss/header-container.scss";
export function HeaderContainer({children, className}: {children: React.ReactNode, className?: string}){
    return(
        <header className={`mobile-header-container ${className || ""}`}>
            {children}
        </header>
    )
}