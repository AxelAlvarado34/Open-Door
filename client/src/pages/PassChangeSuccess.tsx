import { Link } from "react-router-dom";
import '../styles/ForgetPassword.css';

export default function PassChangeSuccess() {
    return (
        <div className="forget-container">
            <form className="forget-form">
                <div className="forget-header">
                    <div className="forget-logo-section">
                        <img className="forget-logo-img" src="/homeLogo.png" alt="logo" />
                        <p className="forget-logo-text">openDoor</p>
                    </div>

                    <p className="forget-welcome-text">Password Changed</p>

                    <p className="forget-welcome-subtext">
                        Your password has been successfully updated.  
                        You can now log in with your new credentials.
                    </p>
                </div>

                <Link
                    to="/login"
                    className="forget-btn-submit text-center"
                >
                    Go to Login
                </Link>

            </form>
        </div>
    );
}
