import React from "react"
import "./scss/stack-container.scss"
interface Props {
    children: React.ReactNode,
    className?: string,
    style?: React.CSSProperties
}
export default function StackContainer(props: Props){
    return(
        <main style={props.style} className={`stack-container ${props.className?props.className:""}`}>
            {props.children}
        </main>
    )
}