import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';
import type { LoginDataForm, ForgetDataForm, ResetDataForm, RegisterDataForm } from '../types';
import { notifyError, notifySucces } from '../helpers/notifys';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export type userStoreTypes = {
    isLogged: boolean;
    loginUser: (user: LoginDataForm, navigate: (path: string) => void) => Promise<void>;
    logoutUser: (navigate: (path: string) => void) => Promise<void>;
    checkUser: () => Promise<void>;
    recoverPassword: (email: ForgetDataForm, navigate: (path: string) => void) => Promise<void>;
    changePassword: (dataChange: ResetDataForm, navigate: (path: string) => void) => Promise<void>;
    createUser: (user: RegisterDataForm, navigate: (path: string) => void) => Promise<void>;
}

export const userStore = create<userStoreTypes>()(devtools((set) => ({
    isLogged: false,

    loginUser: async (user, navigate) => {
        try {
            await axios.post(`${baseURL}/auth/login`, user, { withCredentials: true });
            set({ isLogged: true });
            notifySucces('Login successfully');
            navigate('/opendoor/home');
        } catch (err: any) {
            const message = err?.response?.data?.error || 'Unexpected error';
            notifyError(message);
        }
    },

    checkUser: async () => {
        try {
            const res = await axios.get(`${baseURL}/auth/me`, { withCredentials: true });
            set({ isLogged: res.data.loggedIn });
        } catch {
            set({ isLogged: false });
        }
    },

    logoutUser: async (navigate) => {
        try {
            await axios.post(`${baseURL}/auth/logout`, {}, { withCredentials: true });
            set({ isLogged: false });
            navigate('/login');
        } catch {
            console.error('Logout failed');
        }
    },

    recoverPassword: async (email, navigate) => {
        try {
            await axios.post(`${baseURL}/auth/password`, email);
            navigate('/password/success');
        } catch {
            navigate('/password/error');
        }
    },

    changePassword: async (dataChange, navigate) => {
        try {
            await axios.post(`${baseURL}/auth/change/password/${dataChange.token}`, {
                new_password: dataChange.new_password,
                new_repeat_password: dataChange.new_repeat_password
            });
            navigate('/password/change/success');
        } catch {
            navigate('/password/change/error');
        }
    },

    createUser: async (user, navigate) => {
        try {
            await axios.post(`${baseURL}/auth/register`, user);
            navigate('/confirm');
        } catch {
            navigate('/confirm/error');
        }
    }

})));
