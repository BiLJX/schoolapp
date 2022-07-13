import "./scss/admin-comp.scss"

interface props {
    label: string,
    onClick?: ()=>any,
    className?: string
}

export function AdminSearchBarButton({label, onClick, className}: props){
    return(
        <button className={`admin-search-bar-button ${className||""}`}onClick = {()=>onClick?.()}>{label}</button>
    )
}

interface CancelProps {
    label?: string,
    onClick: ()=>any,
    className?: string
}

export function AdminCancelButton({onClick, className}:CancelProps){
    return(
        <div className={`admin-cancel-button ${className||""}`}onClick = {()=>onClick()}>cancel</div>
    )
}