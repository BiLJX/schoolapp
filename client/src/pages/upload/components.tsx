import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { NavLink } from "react-router-dom";

export function UploadCategory(){
    return(
        <div className = "upload-category-container">
            <NavLink end to = "" className = "upload-category">
                <button className="icon-container">
                    <FormatColorTextOutlinedIcon />
                </button>
                <span>Text</span>
            </NavLink>
            <NavLink to = "image" className = "upload-category">
                <button className="icon-container">
                    <ImageRoundedIcon />
                </button>
                <span>Image</span>
            </NavLink>
        </div>
    )
}