import React from "react"
import "./scss/stack-container.scss"
interface Props {
    children: React.ReactNode,
    className?: string
}
export default function StackContainer(props: Props){
    return(
        <main className={`stack-container ${props.className?props.className:""}`}>
            {props.children}
        </main>
    )
}