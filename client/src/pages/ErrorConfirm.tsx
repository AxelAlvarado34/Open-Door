import { Link } from "react-router-dom";
import '../styles/ForgetPassword.css';

export default function ErrorConfirm() {
    return (
        <div className="forget-container">
            <form className="forget-form">
                <div className="forget-header">
                    <div className="forget-logo-section">
                        <img className="forget-logo-img" src="/homeLogo.png" alt="logo" />
                        <p className="forget-logo-text">openDoor</p>
                    </div>

                    <p className="forget-welcome-text">Confirmation Failed :( </p>

                    <p className="forget-welcome-subtext">
                        Oops! The confirmation link is invalid or has expired.
                        Please check your email and try again, or register a new account.
                    </p>
                </div>

                <Link
                    to="/register"
                    className="forget-btn-submit text-center"
                >
                    Go to Register
                </Link>

            </form>
        </div>
    );
}
