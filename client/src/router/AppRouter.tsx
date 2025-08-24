import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '../layout/AppLayout'
import Login from '../pages/Login'
import UserLayout from '../layout/UserLayout'
import Register from '../pages/Register'
import LandingPage from '../pages/LandingPage'
import ForgetPassword from '../pages/ForgetPassword'
import LookEmail from '../pages/LookEmail'
import SuccessConfirm from '../pages/SuccessConfirm'
import ErrorConfirm from '../pages/ErrorConfirm'
import ConfirmRecover from '../pages/ConfirmRecover'
import ErrorRecover from '../pages/ErrorRecover'
import ResetPassword from '../pages/ResetPassword'
import PassChangeSuccess from '../pages/PassChangeSuccess'
import PassChangeError from '../pages/PassChangeError'
import HomePage from '../pages/HomePage'
import AddProperties from '../pages/AddProperties'
import { userStore } from '../store/UserStore'
import { useEffect } from 'react'
import MyProperties from '../pages/MyProperties'
import EditPropertyPage from '../pages/EditPropertyPage'

export default function AppRouter() {

  const checkUser = userStore(state => state.checkUser);

  useEffect(() => {
    checkUser();
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        {/* Auth Routes */}
        <Route path='/' element={<UserLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          <Route path='password' element={<ForgetPassword />} />
          <Route path='password/success' element={<ConfirmRecover />} />
          <Route path='password/error' element={<ErrorRecover />} />
          <Route path='password/reset/success/:token' element={<ResetPassword />} />
          <Route path='password/change/success' element={<PassChangeSuccess />} />
          <Route path='password/change/error' element={<PassChangeError />} />

          <Route path='confirm' element={<LookEmail />} />
          <Route path='confirm/success' element={<SuccessConfirm />} />
          <Route path='confirm/error' element={<ErrorConfirm />} />
        </Route>
        {/* App Routes */}
        <Route path='/opendoor' element={<AppLayout />}>
          <Route path='home' element={<HomePage />} />
          <Route path='add-property' element={<AddProperties />} />
          <Route path='my-properties' element={<MyProperties />} />
          <Route path="edit-property/:id" element={<EditPropertyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
