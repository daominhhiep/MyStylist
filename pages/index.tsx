import {useState} from 'react';
import type {NextPage} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import {LanguageSwitcher} from '../components/LanguageSwitcher';
import {useAuth} from "../components/AuthProvider";
import { outfits_mock } from "../mock/data";
import Navbar from "../components/NavBar";

const Home: NextPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const outfits = outfits_mock

  const {user, signInWithGoogle, signOut, userProfile, loading} = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>MyStylist - Phong Cách Thời Trang</title>
        <meta name="description" content="Khám phá phong cách thời trang với AI"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Lookbook Thời Trang</h1>
          <p className={styles.heroQuote}>
            "Thời trang không chỉ là quần áo – nó là cách bạn thể hiện chính mình."
          </p>
        </div>

        <div className={styles.outfitGrid}>
          {outfits.map((outfit) => (
            <div key={outfit.id} className={styles.outfitCard}>
              <Link href={`/outfit/${outfit.id}`}>
                <div className={styles.outfitImagePlaceholder}>
                  <span className={styles.outfitEmoji}>👗</span>
                  {outfit.tags[0] && (
                    <div className={styles.labelOverlay}>
                      {outfit.tags[0]}
                    </div>
                  )}
                </div>
              </Link>
              <div className={styles.outfitInfo}>
                <h3 className={styles.outfitName}>{outfit.name}</h3>
                <div className={styles.outfitStyle}>{outfit.style}</div>
                <div className={styles.outfitTags}>
                  {outfit.tags.slice(1).map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.outfitActions}>
                  <Link href={`/outfit/${outfit.id}`} className={styles.viewButton}>
                    Xem thêm
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 MyStylist</p>
      </footer>
    </div>
  );
};

export default Home;