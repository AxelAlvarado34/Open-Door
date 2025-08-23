import { Link } from "react-router-dom";
import '../styles/ForgetPassword.css';

export default function SuccessConfirm() {
    return (
        <div className="forget-container">
            <form className="forget-form">
                <div className="forget-header">
                    <div className="forget-logo-section">
                        <img className="forget-logo-img" src="/homeLogo.png" alt="logo" />
                        <p className="forget-logo-text">openDoor</p>
                    </div>

                    <p className="forget-welcome-text">Account Confirmed</p>

                    <p className="forget-welcome-subtext">
                        Congratulations! Your openDoor account has been successfully confirmed.
                        You can now log in and start exploring properties.
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
