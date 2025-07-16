import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import styles from '../styles/Home.module.css';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

const Home: NextPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const outfits = [
    { id: 1, name: 'Oversized Hoodie Set', style: 'Streetwear', tags: ['hot'], affiliateLink: 'https://shope.ee/streetwear1' },
    { id: 2, name: 'Urban Denim Look', style: 'Streetwear', tags: ['trending'], affiliateLink: 'https://tiktok.com/shop/urban1' },
    { id: 3, name: 'Graphic Tee Combo', style: 'Streetwear', tags: ['casual'], affiliateLink: 'https://shope.ee/graphic1' },
    { id: 4, name: 'Minimalist Tee', style: 'Basic', tags: ['sponsored'], affiliateLink: 'https://shope.ee/basic1' },
    { id: 5, name: 'Classic Jeans Look', style: 'Basic', tags: ['timeless'], affiliateLink: 'https://tiktok.com/shop/classic1' },
    { id: 6, name: 'Retro Denim Jacket', style: 'Vintage', tags: ['trending'], affiliateLink: 'https://shope.ee/vintage1' },
    { id: 7, name: '90s Revival Set', style: 'Vintage', tags: ['hot'], affiliateLink: 'https://tiktok.com/shop/90s1' },
    { id: 8, name: 'Minimalist Outfit', style: 'Clean', tags: ['sponsored'], affiliateLink: 'https://shope.ee/clean1' },
    { id: 9, name: 'Monochrome Look', style: 'Clean', tags: ['elegant'], affiliateLink: 'https://tiktok.com/shop/mono1' },
    { id: 10, name: 'Business Suit', style: 'Formal', tags: ['professional'], affiliateLink: 'https://shope.ee/formal1' },
    { id: 11, name: 'Cocktail Dress', style: 'Formal', tags: ['hot'], affiliateLink: 'https://tiktok.com/shop/formal2' },
    { id: 12, name: 'Gym Ready', style: 'Sporty', tags: ['trending'], affiliateLink: 'https://shope.ee/gym1' }
  ];

  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>OutfitAI Lookbook - Phong Cách Thời Trang</title>
        <meta name="description" content="Khám phá phong cách thời trang với AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.logo}>👗 OutfitAI</h1>
          <nav className={`${styles.nav} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
            <Link href="/" className={styles.navButton} onClick={() => setMobileMenuOpen(false)}>
              Trang chủ
            </Link>
            <Link href="/try-on" className={styles.navButton} onClick={() => setMobileMenuOpen(false)}>
              Gợi ý AI
            </Link>
            <Link href="/admin" className={styles.navButton} onClick={() => setMobileMenuOpen(false)}>
              Thử đồ
            </Link>
          </nav>
          <LanguageSwitcher />
          {session ? (
            <Link href="/profile" className={styles.navButton}>
              Profile
            </Link>
          ) : (
            <button className={styles.navButton} onClick={() => signIn('google')}>
              Đăng nhập Google
            </button>
          )}
          <button className={styles.hamburger} onClick={toggleMobileMenu}>
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

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
              <div className={styles.outfitImagePlaceholder}>
                <span className={styles.outfitEmoji}>👗</span>
                {outfit.tags[0] && (
                  <div className={styles.labelOverlay}>
                    {outfit.tags[0]}
                  </div>
                )}
              </div>
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
        <p>© 2024 OutfitAI - Lookbook Thời Trang</p>
      </footer>
    </div>
  );
};

export default Home;