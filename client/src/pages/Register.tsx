import { Link } from "react-router-dom";
import '../styles/Register.css';
import { useForm } from 'react-hook-form'
import { userStore } from "../store/UserStore";
import { useNavigate } from 'react-router-dom';
import type { RegisterDataForm } from "../types";

export default function Register() {

  const createUser = userStore(state => state.createUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterDataForm>();

  const OnSubmit = (data: RegisterDataForm) => {
    createUser(data, navigate)
    reset();
  }

  return (
    <div className="register-container">
      <form
        className="register-form"
        onSubmit={handleSubmit(OnSubmit)}
      >
        <div className="register-header">
          <div className="register-logo-section">
            <img className="register-logo-img" src="/homeLogo.png" alt="logo" />
            <p className="register-logo-text">openDoor</p>
          </div>

          <p className="register-welcome-text">Sign up</p>

          <p className="register-welcome-subtext">
            Create your account to start exploring exclusive listings and
            get personalized home recommendations tailored to your lifestyle.
          </p>
        </div>

        <div className="register-input-group">
          <input
            type="text"
            id="name"
            className="register-input-field"
            placeholder="Enter your name"
            {...register('name', { required: 'The name is required' })}
          />
          {errors.name && <p className="text-sm text-red-700 transition-all mt-1 ml-1">{errors.name.message}</p>}
        </div>

        <div className="register-input-group">
          <input
            type="email"
            id="email"
            className="register-input-field"
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

        <div className="register-input-group">
          <input
            type="password"
            id="password"
            className="register-input-field"
            placeholder="Enter your password"
            {...register('password', { required: 'The password is required' })}
          />
          {errors.password && <p className="text-sm text-red-700 transition-all mt-1 ml-1">{errors.password.message}</p>}
        </div>

        <div className="register-input-group">
          <input
            type="password"
            id="repeat_password"
            className="register-input-field"
            placeholder="Confirm password"
            {...register('repeat_password', {
              required: 'Please confirm password',
              validate: (value, formValues) => 
                value === formValues.password || 'Passwords do not match'
            })}
          />
          {errors.repeat_password && <p className="text-sm text-red-700 transition-all mt-1 ml-1">{errors.repeat_password.message}</p>}
        </div>

        <p className="register-terms-text">
          By creating an account, you agree to the Privacy Policy and Terms of Service
        </p>

        <button
          type="submit"
          className="register-btn-submit"
        >
          Create an account
        </button>

        <p className="register-signup-text">
          Already have an account?{' '}
          <Link
            to="/login"
            className="register-signup-link"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
