import { Link, useNavigate } from "react-router-dom";
import '../styles/ForgetPassword.css';
import { useForm } from "react-hook-form";
import type { ForgetDataForm } from "../types";
import { userStore } from "../store/UserStore";

export default function ForgetPassword() {

    const recoverPassword = userStore(state => state.recoverPassword )
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ForgetDataForm>();

    const OnSubmit = (data: ForgetDataForm) => {
        recoverPassword(data, navigate)
        reset();
    }

    return (
        <div className="forget-container">
            <form
                className="forget-form"
                onSubmit={handleSubmit(OnSubmit)}
            >
                <div className="forget-header">
                    <div className="forget-logo-section">
                        <img className="forget-logo-img" src="/homeLogo.png" alt="logo" />
                        <p className="forget-logo-text">openDoor</p>
                    </div>

                    <p className="forget-welcome-text">Forgot your password?</p>

                    <p className="forget-welcome-subtext">
                        Enter your email address and we will send you instructions to reset your password.
                    </p>
                </div>

                <div className="forget-input-group">
                    <input
                        type="email"
                        id="email"
                        className="forget-input-field"
                        placeholder="Enter your email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                    />
                    {errors.email && <p className="text-sm text-red-700 transition-all mt-1 ml-1">{errors.email.message}</p>}
                </div>

                <button
                    type="submit"
                    className="forget-btn-submit"
                >
                    Continue
                </button>

                <p className="forget-signup-text">
                    <Link
                        to="/login"
                        className="forget-signup-link"
                    >
                        Back to login page
                    </Link>
                </p>
            </form>
        </div>
    );
}
