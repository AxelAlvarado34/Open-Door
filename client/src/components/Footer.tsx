import { FaFacebook } from 'react-icons/fa';
import styles from '../styles/Footer.module.css';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { ImLinkedin } from 'react-icons/im';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img src="/homeIcon.png" alt="OpenDoor Logo" className={styles.logo} />
          <span className={styles.brandName}>OpenDoor</span>
        </div>

        <nav className={styles.nav}>
          <a href="#home" className={styles.link}>Home</a>
          <a href="#key" className={styles.link}>Features</a>
          <a href="#clients" className={styles.link}>Clients</a>
          <a href="#" className={styles.link}>Contact</a>
        </nav>

        <div className={styles.social}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialLink}>
            <FaFacebook className={styles.social_icon}/>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={styles.socialLink}>
            <FaSquareXTwitter className={styles.social_icon} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
            <ImLinkedin className={styles.social_icon} />
          </a>
        </div>
      </div>

      <div className={styles.copy}>
        &copy; {new Date().getFullYear()} OpenDoor. All rights reserved.
      </div>
    </footer>
  );
}
