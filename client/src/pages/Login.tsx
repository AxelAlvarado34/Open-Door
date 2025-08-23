import { Link, useNavigate } from "react-router-dom";
import '../styles/Login.css';
import { useForm } from "react-hook-form";
import type { LoginDataForm } from "../types";
import { userStore } from "../store/UserStore";

export default function Login() {

  const loginUser = userStore(state => state.loginUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginDataForm>();

  const OnSubmit = (data: LoginDataForm) => {
    loginUser(data, navigate);
    reset();
  }

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

          <p className="welcome-text">Welcome back!</p>

          <p className="welcome-subtext">
            Good to see you again! Sign in to pick up where
            you left off and keep moving forward.
          </p>
        </div>

        <div className="input-group">
          <input
            type="email"
            id="email"
            className="input-field"
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

        <div className="input-group">
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="Enter your password"
            {...register('password', { required: 'The password is required' })}
          />
          {errors.password && <p className="text-sm text-red-700 transition-all mt-1 ml-1">{errors.password.message}</p>}
        </div>

        <Link
          to="/password"
          className="forgot-password-link"
        >
          Forgot password?
        </Link>

        <button
          type="submit"
          className="btn-login"
        >
          Sing in
        </button>

        <p className="signup-text">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="signup-link"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
