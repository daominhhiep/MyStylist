
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'streetwear', name: 'Streetwear', icon: '🔥', bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'basic', name: 'Basic', icon: '👕', bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 'vintage', name: 'Vintage', icon: '📻', bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 'clean', name: 'Clean', icon: '✨', bgGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { id: 'formal', name: 'Formal', icon: '👔', bgGradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { id: 'sporty', name: 'Sporty', icon: '🏃', bgGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }
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
        <title>OutfitAI Lookbook - Phong Cách Thời Trang</title>
        <meta name="description" content="Khám phá phong cách thời trang với AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.logo}>👗 OutfitAI</h1>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navButton}>
              Trang chủ
            </Link>
            <Link href="/try-on" className={styles.navButton}>
              Gợi ý AI
            </Link>
            <Link href="/admin" className={styles.navButton}>
              Thử đồ
            </Link>
          </nav>
          <button className={styles.hamburger}>☰</button>
        </div>
      </header>

      <main className={styles.main}>
        {!selectedCategory ? (
          <>
            <div className={styles.hero}>
              <h1 className={styles.heroTitle}>Phong Cách Hot Hôm Nay</h1>
              <p className={styles.heroQuote}>
                "Thời trang không chỉ là quần áo – nó là cách bạn thể hiện chính mình."
              </p>
            </div>
            
            <div className={styles.categoryGrid}>
              <div className={styles.categories}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={styles.categoryCard}
                    style={{ background: category.bgGradient }}
                  >
                    <div>
                      <span className={styles.categoryIcon}>{category.icon}</span>
                      <div className={styles.categoryName}>{category.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
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
                    {outfit.tags[0] && (
                      <div className={styles.labelOverlay}>
                        {outfit.tags[0]}
                      </div>
                    )}
                  </div>
                  <div className={styles.outfitInfo}>
                    <h3 className={styles.outfitName}>{outfit.name}</h3>
                    <div className={styles.outfitTags}>
                      {outfit.tags.slice(1).map((tag, index) => (
                        <span key={index} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className={styles.outfitActions}>
                      <Link href="/try-on" className={styles.tryButton}>
                        Xem thêm
                      </Link>
                      <a 
                        href={outfit.affiliateLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.shopButton}
                      >
                        Mua ngay
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
        <p>© 2024 OutfitAI - Lookbook Thời Trang</p>
      </footer>
    </div>
  );
};

export default Home;
