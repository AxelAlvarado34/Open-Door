import { Outlet } from "react-router-dom"
import style from '../styles/UserLayout.module.css'
import { Bounce, ToastContainer } from "react-toastify"
import { FaHouse } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { PiStarFourFill } from "react-icons/pi";
import { FaDatabase } from "react-icons/fa";

export default function UserLayout() {
  return (
    <div className={style.user_layout}>

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

      <section className={style.user_content}>
        <Outlet />
      </section>

      <section className={style.user_carrousel}>
        <div className={style.text_info}>
          <h1 className={style.info_carr_title}>Find your dream House whith openDoor</h1>
          <p className={style.info_carr_sub_title}>Discover and manage properties easily with our clean and simple platform.</p>
        </div>

        <div className={style.info_icons}>
          <div className={style.info_div}>
              <div className={style.icon_content}>
                  <FaHouse className={style.icon_log}/>
              </div>

              <div className={style.icon_text}>
                  <p className={style.icon_title}>Browse Properties</p>
                  <p className={style.icon_paragraph}>View listings with all the essential details at a glance.</p>
              </div>
          </div>

          <div className={style.info_div}>
              <div className={style.icon_content}>
                  <MdFavorite className={style.icon_log}/>
              </div>

              <div className={style.icon_text}>
                  <p className={style.icon_title}>Manage Favorites</p>
                  <p className={style.icon_paragraph}>Keep track of properties you love for easy access later.</p>
              </div>
          </div>

          <div className={style.info_div}>
              <div className={style.icon_content}>
                  <PiStarFourFill className={style.icon_log}/>
              </div>

              <div className={style.icon_text}>
                  <p className={style.icon_title}>Simple & Intuitive</p>
                  <p className={style.icon_paragraph}>Designed for a smooth experience — no clutter, just what you need.</p>
              </div>
          </div>

          <div className={style.info_div}>
              <div className={style.icon_content}>
                  <FaDatabase className={style.icon_log}/>
              </div>

              <div className={style.icon_text}>
                  <p className={style.icon_title}>Reliable & Clean Data</p>
                  <p className={style.icon_paragraph}>All property information is organized and easy to understand.</p>
              </div>
          </div>
        </div>
      </section>
    </div>
  )
}
