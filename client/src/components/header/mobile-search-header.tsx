import { HeaderContainer } from "container/mobile-layouts/header-container";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import "./stack-header.scss"
import { useState } from "react";
interface SearchHeaderProps {
    goBackTo?: string,
    goBack?: boolean,
    buttonLabel: string,
    onSearch?: (val: string) => any;
    onChange?: (val: string) => any;
}
export default function MobileSearchHeader({
    goBackTo, 
    goBack,
    buttonLabel,
    onChange,
    onSearch
}: SearchHeaderProps){
    const navigate = useNavigate();
    const [text, setText] = useState("")
    return(
        <HeaderContainer className="stack-header-search">
            {goBack && (<button className = "stack-header-icon" onClick={()=>goBackTo?navigate(goBackTo):navigate(-1)}>
                <ChevronLeftRoundedIcon />
            </button>)}
            <div className = "stack-header-search-container">
                <div className = "stack-header-search-icon">
                    <SearchIcon />
                </div>
                <input className = "stack-header-search-input" placeholder="Search" onChange={(e)=>{onChange?.(e.target.value); setText(e.target.value)}} />
            </div>
            <div className = "stack-header-search-button" onClick={()=>onSearch?.(text)}>{buttonLabel}</div>
        </HeaderContainer>
    )
}