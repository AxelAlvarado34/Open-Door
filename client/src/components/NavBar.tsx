import { Link } from 'react-router-dom';
import style from '../styles/NavBar.module.css';
import { userStore } from '../store/UserStore';
import { useEffect } from 'react';

export default function NavBar() {
  const isLogged = userStore(state => state.isLogged);
  const checkUser = userStore(state => state.checkUser);
  const logoutUser = userStore(state => state.logoutUser);

  useEffect(() => { checkUser(); }, []);

  return (
    <nav className={style.nav_app_black}>
      <div className={style.nav_logo}>
        <img src="/homeIcon.png" className={style.nav_logo_icon} alt="logo_icon" />
        <Link to={'/opendoor/home'} className={style.nav_logo_title}>openDoor</Link>
      </div>

      {isLogged ? (
        <div className={style.nav_actions}>
          <div className={style.nav_btn_section}>
            <button className={style.nav_btn_login} onClick={() => logoutUser(() => {})}>
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div className={style.nav_btn_section}>
          <Link className={style.nav_btn_login} to={'/login'}>Login</Link>
        </div>
      )}
    </nav>
  )
}
