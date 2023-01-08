import { Link, NavLink } from "react-router-dom";
import "./nav.scss";
interface ItemProps {
    title: string;
    step: number;
    is_active: boolean
}
export default function CreateUserNav({items_names}: {items_names: ItemProps[]}){
    return(
        <nav className = "create-user-nav">
            {items_names.map((x, i) => <NavItem is_active = {x.is_active} title={x.title} step = {x.step} key = {i}  />)}
        </nav>
    )
}


function NavItem({title, step, is_active}: ItemProps){
    if(!is_active){
        return(
            <div style = {{cursor: "default"}} className={"create-user-nav-item" + (is_active?" active":"")}>
                <div className = "top">
                    <div className = "step-container">{step}</div>
                    <div className = "step-title">{title}</div>
                </div>
                <div className = "bottom">
                    <div className = "line" />
                </div>
            </div>
        )
    }
    return(
        <Link to = {step + ""} className={"create-user-nav-item" + (is_active?" active":"")}>
            <div className = "top">
                <div className = "step-container">{step}</div>
                <div className = "step-title">{title}</div>
            </div>
            <div className = "bottom">
                <div className = "line" />
            </div>
        </Link>
    )
}