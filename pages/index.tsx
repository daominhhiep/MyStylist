import {useState} from 'react';
import type {NextPage} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useOutfits } from '../hooks/useOutfits';

const Home: NextPage = () => {
  const {
    outfits,
    loading,
    hasMore,
    loadMore,
  } = useOutfits();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Lookbook Thời Trang</h1>
          <p className={styles.heroQuote}>
            `Thời trang không chỉ là quần áo – nó là cách bạn thể hiện chính mình.`
          </p>
        </div>

        <div className={styles.outfitGrid}>
          {outfits.map((outfit) => (
            <div key={outfit.id} className={styles.outfitCard}>
              <Link href={`/outfit/${outfit.id}`}>
                <div className={styles.outfitImagePlaceholder}>
                  {outfit.images && outfit.images.length > 0 ? (
                    <img 
                      src={outfit.images[0]} 
                      alt={outfit.title}
                      className={styles.outfitImage}
                    />
                  ) : (
                    <span className={styles.outfitEmoji}>👗</span>
                  )}
                </div>
              </Link>
              <div className={styles.outfitInfo}>
                <h3 className={styles.outfitName}>{outfit.title}</h3>
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

        {loading && (
          <div className={styles.loading}>
            <p>Loading outfits...</p>
          </div>
        )}

        {hasMore && !loading && (
          <div className={styles.loadMore}>
            <button onClick={loadMore} className={styles.loadMoreButton}>
              Load More Outfits
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;