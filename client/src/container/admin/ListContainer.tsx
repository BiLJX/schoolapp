import { FC, ReactNode } from "react"

import "./scss/list-container.scss"
export const ListContainer: FC<{children: ReactNode}> = ({children})=>{
    return(
        <div className="admin-list-container">
            {children}
        </div>
    )
}