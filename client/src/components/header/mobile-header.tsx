import { HeaderContainer } from "container/mobile-layouts/header-container";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import "./stack-header.scss"
import { useNavigate } from "react-router-dom";
interface StackHeaderProps {
    label: string,
    goBackTo?: string|number,
    goBack?: boolean
}
export default function MobileStackHeader({label, goBackTo, goBack}: StackHeaderProps){
    const navigate = useNavigate()
    return(
        <HeaderContainer>
            {goBack && (<button className = "stack-header-icon" onClick={()=>goBackTo?navigate(goBackTo as any):navigate(-1)}>
                <ChevronLeftRoundedIcon />
            </button>)}
            <h3 className = "stack-header-label">{label}</h3>
        </HeaderContainer>
    )
}