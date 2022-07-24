import React from "react";
import { NavLink } from "react-router-dom";
import "./avatar.scss"
interface Props {
    className?: string,
    to?: string,
    style?: React.CSSProperties,
    src: string,
    onClick?: (e: any) => any;
}

export default function Avatar(
    {
        to,
        className,
        style,
        src,
        onClick
    }: Props
){
    if(to){
        return(
            <NavLink style={style} to = {to} className = {"avatar "+className} onClick = {(e)=>onClick?.(e)}>
                <img src = {src} className = "full-img" />
            </NavLink>
        )
    }
    return(
        <div style={style} className = {"avatar "+className} onClick = {(e)=>onClick?.(e)}>
            <img src = {src} className = "full-img" />
        </div>
    )
}