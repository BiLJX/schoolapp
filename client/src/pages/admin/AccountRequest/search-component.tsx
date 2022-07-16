import SearchIcon from '@mui/icons-material/Search';
export function SearchComponent(){
    return(
        <form className = "admin-request-search">
            <div className = "icon">
                <SearchIcon />
            </div>
            <input type = "text" placeholder="Search by email or name" />
        </form>
    )
}