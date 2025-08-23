import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Bounce, ToastContainer } from "react-toastify";
import style from '../styles/AppLayout.module.css'
import Footer from "../components/Footer";

export default function AppLayout() {
  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

      <div>
        <NavBar />
      </div>

      <section className={style.content_app}>
        <Outlet />
      </section>

      {/* <Footer/> */}
    </>
  )
}
