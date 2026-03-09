import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <span className={styles.crown}>♛</span>
            <span className={styles.logoText}>Crown</span>
          </div>
          <p className={styles.tagline}>Premium quality, royal experience.</p>
          <p className={styles.copy}>© {new Date().getFullYear()} Crown. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
