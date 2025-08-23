import { Link } from "react-router-dom";
import '../styles/ForgetPassword.css';

export default function PassChangeError() {
    return (
        <div className="forget-container">
            <form className="forget-form">
                <div className="forget-header">
                    <div className="forget-logo-section">
                        <img className="forget-logo-img" src="/homeLogo.png" alt="logo" />
                        <p className="forget-logo-text">openDoor</p>
                    </div>

                    <p className="forget-welcome-text">Password Change Failed</p>

                    <p className="forget-welcome-subtext">
                        Something went wrong while updating your password.  
                        Please try again or contact support if the problem persists.
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
