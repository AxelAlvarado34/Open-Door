import { Link } from "react-router-dom";
import '../styles/ForgetPassword.css';

export default function ErrorRecover() {
    return (
        <div className="forget-container">
            <form className="forget-form">
                <div className="forget-header">
                    <div className="forget-logo-section">
                        <img className="forget-logo-img" src="/homeLogo.png" alt="logo" />
                        <p className="forget-logo-text">openDoor</p>
                    </div>

                    <p className="forget-welcome-text">Recovery Failed :(</p>

                    <p className="forget-welcome-subtext">
                        Oops! The recovery link is invalid or has expired.
                        Please request a new password reset to continue.
                    </p>
                </div>

                <Link
                    to="/password"
                    className="forget-btn-submit text-center"
                >
                    Try Again
                </Link>

            </form>
        </div>
    );
}
