// components/Navbar.tsx

import Link from 'next/link';
import { useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import styles from '../styles/Home.module.css';
import { useAuth } from "./AuthProvider";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <Link href="/" className={styles.link} onClick={() => setMobileMenuOpen(false)}>
          <h1 className={styles.logo}>👗 MyStylist</h1>
        </Link>
        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <Link href="/try-on" className={styles.navButton} onClick={() => setMobileMenuOpen(false)}>
            Gợi ý AI
          </Link>
          <Link href="/admin" className={styles.navButton} onClick={() => setMobileMenuOpen(false)}>
            Thử đồ
          </Link>
          <div className={styles.mobileOnlyActions}>
            <div className={styles.languageSection}>
              {/*<LanguageSwitcher />*/}
            </div>
            {user ? (
              <Link
                href="/profile"
                className={`${styles.navButton} ${styles.profileNavButton}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <img
                  src={user.photoURL || '/default-avatar.png'}
                  alt="Profile"
                  className={styles.smallAvatar}
                />
                Thông tin cá nhân
              </Link>
            ) : (
              <button
                className={`${styles.navButton} ${styles.loginNavButton}`}
                onClick={() => {
                  signInWithGoogle();
                  setMobileMenuOpen(false);
                }}
              >
                Đăng nhập Google
              </button>
            )}
          </div>
        </nav>
        <div className={styles.headerActions}>
          {/*<LanguageSwitcher />*/}
          {user ? (
            <Link href="/profile" className={styles.profileButton}>
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt="Avatar"
                className={styles.profileAvatar}
              />
              {user.displayName}
            </Link>
          ) : (
            <button onClick={signInWithGoogle} className={styles.loginButton}>
              Đăng nhập
            </button>
          )}
        </div>
        <button className={styles.hamburger} onClick={toggleMobileMenu}>
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
