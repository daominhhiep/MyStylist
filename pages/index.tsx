
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'streetwear', name: 'Streetwear', icon: '🔥', color: 'bg-orange-500' },
    { id: 'basic', name: 'Basic', icon: '👕', color: 'bg-blue-500' },
    { id: 'vintage', name: 'Vintage', icon: '📻', color: 'bg-amber-600' },
    { id: 'clean', name: 'Clean', icon: '✨', color: 'bg-gray-100' },
    { id: 'formal', name: 'Formal', icon: '👔', color: 'bg-gray-800' },
    { id: 'sporty', name: 'Sporty', icon: '🏃', color: 'bg-green-500' }
  ];

  const outfits = {
    streetwear: [
      { id: 1, name: 'Oversized Hoodie Set', image: '/outfit1.jpg', tags: ['🔥 HOT', 'trending'], affiliateLink: 'https://shope.ee/streetwear1' },
      { id: 2, name: 'Urban Denim Look', image: '/outfit2.jpg', tags: ['edgy', 'cool'], affiliateLink: 'https://tiktok.com/shop/urban1' },
      { id: 3, name: 'Graphic Tee Combo', image: '/outfit3.jpg', tags: ['casual', 'vibrant'], affiliateLink: 'https://shope.ee/graphic1' }
    ],
    basic: [
      { id: 4, name: 'Minimalist Tee', image: '/outfit4.jpg', tags: ['simple', 'versatile'], affiliateLink: 'https://shope.ee/basic1' },
      { id: 5, name: 'Classic Jeans Look', image: '/outfit5.jpg', tags: ['timeless', 'everyday'], affiliateLink: 'https://tiktok.com/shop/classic1' }
    ],
    vintage: [
      { id: 6, name: 'Retro Denim Jacket', image: '/outfit6.jpg', tags: ['📈 TRENDING', 'throwback'], affiliateLink: 'https://shope.ee/vintage1' },
      { id: 7, name: '90s Revival Set', image: '/outfit7.jpg', tags: ['nostalgic', 'unique'], affiliateLink: 'https://tiktok.com/shop/90s1' }
    ],
    clean: [
      { id: 8, name: 'Minimalist Outfit', image: '/outfit8.jpg', tags: ['💰 SPONSORED', 'elegant'], affiliateLink: 'https://shope.ee/clean1' },
      { id: 9, name: 'Monochrome Look', image: '/outfit9.jpg', tags: ['sophisticated', 'modern'], affiliateLink: 'https://tiktok.com/shop/mono1' }
    ],
    formal: [
      { id: 10, name: 'Business Suit', image: '/outfit10.jpg', tags: ['professional', 'sharp'], affiliateLink: 'https://shope.ee/formal1' },
      { id: 11, name: 'Cocktail Dress', image: '/outfit11.jpg', tags: ['elegant', 'classy'], affiliateLink: 'https://tiktok.com/shop/cocktail1' }
    ],
    sporty: [
      { id: 12, name: 'Gym Ready', image: '/outfit12.jpg', tags: ['active', 'breathable'], affiliateLink: 'https://shope.ee/gym1' },
      { id: 13, name: 'Athleisure', image: '/outfit13.jpg', tags: ['comfortable', 'trendy'], affiliateLink: 'https://tiktok.com/shop/athleisure1' }
    ]
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Style Lookbook - Choose Your Perfect Outfit</title>
        <meta name="description" content="Discover and choose outfits without trying them on" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.logo}>OutfitAI</h1>
          <nav className={styles.nav}>
            <Link href="/try-on">
              <button className={styles.navButton}>🤖 AI Try-On</button>
            </Link>
            <Link href="/admin">
              <button className={styles.navButton}>⚙️ Admin</button>
            </Link>
          </nav>
        </div>
        <p className={styles.tagline}>AI-powered outfit suggestions with virtual try-on</p>
      </header>

      <main className={styles.main}>
        {!selectedCategory ? (
          <div className={styles.categoryGrid}>
            <h2 className={styles.sectionTitle}>What's the occasion?</h2>
            <div className={styles.categories}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${styles.categoryCard} ${category.color}`}
                >
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <span className={styles.categoryName}>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.outfitSection}>
            <div className={styles.backButton}>
              <button onClick={() => setSelectedCategory(null)}>
                ← Back to Categories
              </button>
            </div>
            
            <h2 className={styles.sectionTitle}>
              {categories.find(c => c.id === selectedCategory)?.name} Outfits
            </h2>
            
            <div className={styles.outfitGrid}>
              {outfits[selectedCategory as keyof typeof outfits]?.map((outfit) => (
                <div key={outfit.id} className={styles.outfitCard}>
                  <div className={styles.outfitImagePlaceholder}>
                    <span className={styles.outfitEmoji}>👗</span>
                  </div>
                  <div className={styles.outfitInfo}>
                    <h3 className={styles.outfitName}>{outfit.name}</h3>
                    <div className={styles.outfitTags}>
                      {outfit.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className={styles.outfitActions}>
                      <Link href="/try-on">
                        <button className={styles.tryButton}>
                          🤖 Try On
                        </button>
                      </Link>
                      <a 
                        href={outfit.affiliateLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.shopButton}
                      >
                        🛒 Shop
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>© 2024 StyleBook - Your Digital Closet</p>
      </footer>
    </div>
  );
};

export default Home;
