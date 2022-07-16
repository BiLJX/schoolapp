import { AuthPicture, AuthTitle } from "components/form/FormComponents";

export default function AccountReview(){
    return(
        <div className = "auth-container">
            <AuthPicture style={{ maxHeight: "400px", height: "40vh", marginBottom: "1rem" }} src = "https://i.pinimg.com/originals/f7/74/18/f77418b9aad5a18165b0e54c1691035f.jpg" />
            <AuthTitle title = "Account in review" />
            <p style = {{ padding: "1rem", color: "var(--text-secondary)", fontWeight: "500", fontSize: "1.2rem" }}>
                Your account is in review stage. Please wait until the admin of the school approve your request for creating an account.
            </p>
            <p style = {{ padding: "1rem", color: "var(--text-secondary)", fontWeight: "500", fontSize: "1.2rem" }}>
                If your account is approved, you will be able to access the app. If account is rejected your account is deleted and you have to re-signup.
            </p>
        </div>
    )
} 