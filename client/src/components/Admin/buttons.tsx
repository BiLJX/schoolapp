import "./scss/admin-comp.scss"

interface props {
    label: string,
    onClick?: ()=>any,
    className?: string,
    loading?: boolean
}

export function AdminSearchBarButton({label, onClick, className, loading}: props){
    if(loading){
        return(
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }} className={`admin-search-bar-button ${className||""}`}>Adding...</div>
        )
    }
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