import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { CreateUserButton } from '../global';
import "./component.scss";

interface Props {
    onSearch: (value: string) => void;
}
export default function ManageHeader({
    onSearch
}: Props){
    return(
        <header className="admin-user-manage-header">
            <div className = "account-search">
                <div className = "search-icon">
                    <SearchOutlinedIcon />
                </div>
                <input type = "text" placeholder="Search..." onChange={e=>onSearch(e.target.value)}/>
            </div>
            <CreateUserButton onClick={()=>null} />
        </header>
    )
}