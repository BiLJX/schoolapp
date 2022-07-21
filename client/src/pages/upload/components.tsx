import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';


interface Props {
    onImage: (image: File) => any;
    onText: () => any;
}
export function UploadCategory(props: Props){
    return(
        <div className = "upload-category-container">
            <a className = "upload-category" onClick = {props.onText}>
                <button className="icon-container">
                    <FormatColorTextOutlinedIcon />
                </button>
                <span>Text</span>
            </a>
            <input id = "upload-post-image-input" hidden type = "file" onChange = {(e: any)=>e.target.files[0] && props.onImage(e.target.files[0])} />
            <label htmlFor='upload-post-image-input' className = "upload-category" >
                <div className="icon-container">
                    <ImageRoundedIcon />
                </div>
                <span>Image</span>
            </label>
        </div>
    )
}

interface UploadImageProps {
    src: string
}
export function UploadImage({src}: UploadImageProps){
    return(
        <div className = "upload-image-container">
            <img src = {src} className = "full-img" />
        </div>
    )
}