import "./card.scss"
interface CardProps {
    className?: string,
    style?: React.CSSProperties,
    children: React.ReactNode
}
export default function AdminCardContainer({className, style, children}:CardProps){
    return(
        <div className={`admin-card-container ${className || ""}`} style = {style}>
            {children}
        </div>
    )
}