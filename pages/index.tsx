
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'casual', name: 'Casual', icon: '👕', color: 'bg-blue-500' },
    { id: 'formal', name: 'Formal', icon: '👔', color: 'bg-gray-800' },
    { id: 'sporty', name: 'Sporty', icon: '🏃', color: 'bg-green-500' },
    { id: 'party', name: 'Party', icon: '🎉', color: 'bg-purple-500' },
    { id: 'date', name: 'Date Night', icon: '❤️', color: 'bg-pink-500' },
    { id: 'work', name: 'Work', icon: '💼', color: 'bg-indigo-500' }
  ];

  const outfits = {
    casual: [
      { id: 1, name: 'Denim & Tee', image: '/outfit1.jpg', tags: ['comfortable', 'everyday'] },
      { id: 2, name: 'Summer Vibes', image: '/outfit2.jpg', tags: ['light', 'fresh'] },
      { id: 3, name: 'Cozy Layers', image: '/outfit3.jpg', tags: ['warm', 'stylish'] }
    ],
    formal: [
      { id: 4, name: 'Business Suit', image: '/outfit4.jpg', tags: ['professional', 'sharp'] },
      { id: 5, name: 'Cocktail Dress', image: '/outfit5.jpg', tags: ['elegant', 'classy'] }
    ],
    sporty: [
      { id: 6, name: 'Gym Ready', image: '/outfit6.jpg', tags: ['active', 'breathable'] },
      { id: 7, name: 'Athleisure', image: '/outfit7.jpg', tags: ['comfortable', 'trendy'] }
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
        <h1 className={styles.logo}>StyleBook</h1>
        <p className={styles.tagline}>Find your perfect outfit, no fitting room required</p>
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
                    <button className={styles.tryButton}>
                      Try This Look
                    </button>
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
