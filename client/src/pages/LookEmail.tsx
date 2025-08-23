import { Link } from "react-router-dom";
import '../styles/ForgetPassword.css';

export default function LookEmail() {
    return (
        <div className="forget-container">
            <form className="forget-form">
                <div className="forget-header">
                    <div className="forget-logo-section">
                        <img className="forget-logo-img" src="/homeLogo.png" alt="logo" />
                        <p className="forget-logo-text">openDoor</p>
                    </div>

                    <p className="forget-welcome-text">User created successfull</p>

                    <p className="forget-welcome-subtext">
                        Your account has been successfully created. Please verify your email to activate it.
                    </p>
                </div>


                <Link
                    to="/login"
                    className="forget-btn-submit text-center"
                >
                    Back to login page
                </Link>

            </form>
        </div>
    );
}
