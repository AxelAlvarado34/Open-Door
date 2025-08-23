import { Link } from "react-router-dom";
import '../styles/ForgetPassword.css';

export default function ConfirmRecover() {
    return (
        <div className="forget-container">
            <form className="forget-form">
                <div className="forget-header">
                    <div className="forget-logo-section">
                        <img className="forget-logo-img" src="/homeLogo.png" alt="logo" />
                        <p className="forget-logo-text">openDoor</p>
                    </div>

                    <p className="forget-welcome-text">Check Your Email</p>

                    <p className="forget-welcome-subtext">
                        We’ve sent you an email with instructions to reset your password.
                        Please check your inbox (and spam folder) to continue with the process.
                    </p>
                </div>

                <Link
                    to="/login"
                    className="forget-btn-submit text-center"
                >
                    Back to Login
                </Link>

            </form>
        </div>
    );
}
