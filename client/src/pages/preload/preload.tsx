import { BounceLoader } from "react-spinners"
import "./preload.scss"
export default function PreLoadPage(){
    return(
        <div className = "pre-loader">
            <h2>Classital</h2>
            <BounceLoader size={30} color="var(--blue)" />
        </div>
    )
}