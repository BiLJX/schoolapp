import React from "react";
import { NavLink } from "react-router-dom";
import "./avatar.scss"
interface Props {
    className?: string,
    to?: string,
    style?: React.CSSProperties,
    src: string,
    size?: number
    onClick?: (e: any) => any;
}

export default function Avatar(
    {
        to,
        className,
        style,
        src,
        size = 30,
        onClick,
    }: Props
){
    if(to){
        return(
            <NavLink style={{width: size + "px", height: size + "px",...style}} to = {to} className = {"avatar "+className||""} onClick = {(e)=>onClick?.(e)}>
                <img src = {src} className = "full-img" />
            </NavLink>
        )
    }
    return(
        <div style={{width: size + "px", height: size + "px",...style}} className = {"avatar "+className||""} onClick = {(e)=>onClick?.(e)}>
            <img src = {src} className = "full-img" />
        </div>
    )
}
interface SkeletonProps {
    className?: string,
    style?: React.CSSProperties,
    size?: number
}
export function SkeletonAvatar({
    className,
    style,
    size = 30,
}: SkeletonProps){
    return(
        <div style={{width: size + "px", height: size + "px",...style}} className = {"avatar "+className||""}>  
        </div>
    )
}