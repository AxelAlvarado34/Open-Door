import { useForm } from "react-hook-form";
import type { ResetDataForm } from "../types";
import '../styles/Login.css';
import { useNavigate, useParams } from "react-router-dom";
import { userStore } from "../store/UserStore";

export default function ResetPassword() {

    const changePassword = userStore(state => state.changePassword);
    const navigate = useNavigate();
    const { token } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ResetDataForm>();

    const OnSubmit = (data: ResetDataForm) => {
        if(!token) return;
        changePassword({...data, token}, navigate);
        reset();
    };

    return (
        <div className="login-container">
            <form
                className="login-form"
                onSubmit={handleSubmit(OnSubmit)}
            >
                <div className="login-header">
                    <div className="logo-section">
                        <img className="logo-img" src="/homeLogo.png" alt="logo" />
                        <p className="logo-text">openDoor</p>
                    </div>

                    <p className="welcome-text">Reset Your Password</p>

                    <p className="welcome-subtext">
                        Enter your new password below and confirm it to complete the reset.
                    </p>
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        id="password"
                        className="input-field"
                        placeholder="New password"
                        {...register("new_password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                    />
                    {errors.new_password && (
                        <p className="text-sm text-red-700 transition-all mt-1 ml-1">
                            {errors.new_password.message}
                        </p>
                    )}
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        id="confirmPassword"
                        className="input-field"
                        placeholder="Repeat new password"
                        {...register("new_repeat_password", {
                            required: "Please confirm your password",
                            validate: (value, formValues) =>
                                value === formValues.new_password || "Passwords do not match",
                        })}
                    />
                    {errors.new_repeat_password && (
                        <p className="text-sm text-red-700 transition-all mt-1 ml-1">
                            {errors.new_repeat_password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn-login"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
}
