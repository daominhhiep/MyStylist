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
  const { id } = router.query;
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutfit = async () => {
      setLoading(true);
      try {
        const outfitData = await getOutfitById(id as string);
        if (outfitData) {
          setOutfit(outfitData);
        } else {
          // If no data from Firestore, fallback to mock data
          const mockOutfit = getMockOutfitById(id as string);
          setOutfit(mockOutfit);
        }
      } catch (error) {
        console.error("Error fetching from Firestore:", error);
        // Fallback to mock data in case of error
        const mockOutfit = getMockOutfitById(id as string);
        setOutfit(mockOutfit);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOutfit();
    }
  }, [id]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!outfit) {
    return <div>Outfit not found</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{outfit.name} - MyStylist</title>
        <meta name="description" content={outfit.description} />
      </Head>

      <main className={styles.main}>
        <div className={styles.outfitLayout}>
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              {outfit.images && outfit.images.length > 0 ? (
                <img 
                  src={outfit.images[currentImageIndex]} 
                  alt={outfit.name}
                  className={styles.image}
                />
              ) : (
                <span className={styles.outfitEmoji}>👕</span>
              )}
            </div>
            {outfit.images && outfit.images.length > 1 && (
              <div className={styles.thumbnails}>
                {outfit.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image}
                    alt={`${outfit.name} ${index + 1}`}
                    className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.outfitInfo}>
              <h1 className={styles.outfitTitle}>{outfit.name}</h1>
              <div className={styles.rating}>
                <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
                <span className={styles.ratingText}>
                  {outfit.rating} ({outfit.reviews} reviews)
                </span>
              </div>
              <p className={styles.description}>{outfit.description}</p>
              <div className={styles.modelSpecs}>
                <h3>{t('outfit.modelSpecs')}</h3>
                <div className={styles.specsGrid}>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>{t('outfit.height')}:</span>
                    <span className={styles.specValue}>{outfit.modelSpecs.height}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>{t('outfit.weight')}:</span>
                    <span className={styles.specValue}>{outfit.modelSpecs.weight}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Vòng ngực:</span>
                    <span className={styles.specValue}>{outfit.modelSpecs.chest}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Vòng eo:</span>
                    <span className={styles.specValue}>{outfit.modelSpecs.waist}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Vòng hông:</span>
                    <span className={styles.specValue}>{outfit.modelSpecs.hips}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>{t('outfit.size')}:</span>
                    <span className={styles.specValue}>{outfit.modelSpecs.size}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.itemBreakdown}>
              <h3>{t('outfit.itemBreakdown')}</h3>
              <div className={styles.items}>
                {outfit.items.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <Link href={`/item/${item.id}`}>
                      <div className={styles.itemImage}>
                        <span className={styles.itemIcon}>👕</span>
                      </div>
                    </Link>
                    <div className={styles.itemDetails}>
                      <Link href={`/item/${item.id}`} className={styles.itemNameLink}>
                        <span className={styles.itemName}>{item.name}</span>
                      </Link>
                      <span className={styles.itemBrand}>{item.brand}</span>
                      <span className={styles.itemPrice}>{item.price}</span>
                    </div>
                    <div className={styles.itemActions}>
                      <a 
                        href={item.shopeeLink || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.shopeeButton}
                      >
                        Shopee
                      </a>
                      <a 
                        href={item.tiktokLink || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.tiktokButton}
                      >
                        TikTok
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.tags}>
              {outfit.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OutfitDetail;