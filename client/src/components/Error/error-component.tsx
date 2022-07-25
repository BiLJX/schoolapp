import "./error.scss";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
interface NotFoundProps {
    title: string
}
export function NotFound({title}: NotFoundProps){
    return(
        <div className = "error-component">
            <img src = "https://media.istockphoto.com/vectors/concept-404-error-page-flat-cartoon-style-vector-illustration-vector-id1149316411?k=20&m=1149316411&s=612x612&w=0&h=wzSCBQVVh76LWzeEQP01DDEhpm983Y6_tsqlZ46goZ0=" />
            <h2>{title}</h2>
        </div>
    )
}

export function InformationError({title}: {title: string}){
    return(
        <div className = "error-component">
            <div className = "error-component-icon-wrapper">
                <ErrorOutlineIcon className="error-component-information" />
            </div>
            <h2>{title}</h2>
        </div>
    )
}