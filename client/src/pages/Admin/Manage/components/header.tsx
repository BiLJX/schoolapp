import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { CreateUserButton } from '../global';
import "./component.scss"
export default function ManageHeader(){
    return(
        <header className="admin-user-manage-header">
            <div className = "account-search">
                <div className = "search-icon">
                    <SearchOutlinedIcon />
                </div>
                <input type = "text" placeholder="Search..."/>
            </div>
            <CreateUserButton onClick={()=>null} />
        </header>
    )
}