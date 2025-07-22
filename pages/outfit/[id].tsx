import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from '../../hooks/useTranslation';
import { incrementOutfitViews, incrementOutfitClicks, getOutfitById } from '../../lib/firestore';
import { getOutfitById as getMockOutfitById } from '../../mock/data';
import styles from '../../styles/Outfit.module.css';

const OutfitDetail = () => {
  const router = useRouter();
  const {id} = router.query;
  const {t} = useTranslation();
  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchOutfit = async () => {
      setLoading(true);
      try {
        const outfitData = await getOutfitById(id as string);
        if (outfitData) {
          setOutfit(outfitData);
          // Increment views
          try {
            await incrementOutfitViews(id as string);
          } catch (error) {
            console.log('Could not increment views, using mock data');
          }
        } else {
          // If no data from Firestore, fallback to mock data
          const mockOutfit = getMockOutfitById(id as string);
          setOutfit(mockOutfit || null);
        }
      } catch (error) {
        console.error("Error fetching from Firestore:", error);
        // Fallback to mock data in case of error
        const mockOutfit = getMockOutfitById(id as string);
        setOutfit(mockOutfit || null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOutfit();
    }
  }, [id]);

  const handleShareOutfit = async () => {
    try {
      await incrementOutfitClicks(id as string);
    } catch (error) {
      console.log('Could not increment clicks');
    }

    if (navigator.share) {
      navigator.share({
        title: outfit?.title || outfit?.name,
        text: outfit?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>Loading...</div>
    );
  }

  if (!outfit) {
    return (
      <div className={styles.notFound}>Outfit not found</div>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.outfitLayout}>
        <div className={styles.imageSection}>
          <div className={styles.mainImageContainer}>
            {outfit.images && outfit.images.length > 0 ? (
              <>
                <img
                  src={outfit.images[currentImageIndex]}
                  alt={outfit.title || outfit.name}
                  className={styles.mainImage}
                />
              </>
            ) : (
              <div className={styles.imagePlaceholder}>
                <span className={styles.outfitEmoji}>👕</span>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {outfit.images && outfit.images.length > 1 && (
            <div className={styles.thumbnailGallery}>
              {outfit.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`${styles.thumbnail} ${
                    index === currentImageIndex ? styles.activeThumbnail : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${outfit.title || outfit.name} - Image ${index + 1}`}
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.outfitHeader}>
            <h1 className={styles.outfitTitle}>OUTFIT ITEMS</h1>
          </div>

          <div className={styles.itemsList}>
            {outfit.items && outfit.items.map((item, index) => (
              <div key={index} className={styles.itemRow}>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemDescription}>{item.description || item.brand}</p>
                </div>
                <div className={styles.itemActions}>
                  {item.shopeeLink && (
                    <a
                      href={item.shopeeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shopeeButton}
                      onClick={handleShareOutfit}
                    >
                      SHOPEE
                    </a>
                  )}
                  {item.tiktokLink && (
                    <a
                      href={item.tiktokLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.tiktokButton}
                      onClick={handleShareOutfit}
                    >
                      TIKTOK
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {outfit.modelSpecs && (
            <div className={styles.modelInfo}>
              <h3 className={styles.modelTitle}>MODEL INFO</h3>
              <div className={styles.modelStats}>
                <div className={styles.modelStat}>
                  <span className={styles.statLabel}>Chiều cao:</span>
                  <span className={styles.statValue}>{outfit.modelSpecs.height}</span>
                </div>
                <div className={styles.modelStat}>
                  <span className={styles.statLabel}>Cân nặng:</span>
                  <span className={styles.statValue}>{outfit.modelSpecs.weight}</span>
                </div>
                <div className={styles.modelStat}>
                  <span className={styles.statLabel}>Size:</span>
                  <span className={styles.statValue}>{outfit.modelSpecs.size}</span>
                </div>
                <div className={styles.modelStat}>
                  <span className={styles.statLabel}>Style:</span>
                  <span className={styles.statValue}>{outfit.style}</span>
                </div>
              </div>
            </div>
          )}

          <button onClick={handleShareOutfit} className={styles.shareButton}>
            🔗 SHARE OUTFIT
          </button>
        </div>
      </div>
    </main>
  );
};

export default OutfitDetail;
