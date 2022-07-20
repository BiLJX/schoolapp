import { HeaderContainer } from "container/mobile-layouts/header-container";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import "./stack-header.scss"
import { useNavigate } from "react-router-dom";
interface StackHeaderProps {
    label: string,
    goBackTo?: string,
}
export default function MobileStackHeader({label, goBackTo}: StackHeaderProps){
    const navigate = useNavigate()
    return(
        <HeaderContainer>
            <button className = "stack-header-icon" onClick={()=>goBackTo?navigate(goBackTo):navigate(-1)}>
                <ChevronLeftIcon />
            </button>
            <h3 className = "stack-header-label">{label}</h3>
        </HeaderContainer>
    )
}