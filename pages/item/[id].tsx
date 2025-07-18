import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Item.module.css';
import {item_mock} from "../../mock/data";

const ItemDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('default');

  // Mock data - trong thực tế sẽ fetch từ API
  const item = item_mock(id[0])

  return (
    <div className={styles.container}>
      <Head>
        <title>{item.name} - {item.brand} - MyStylist</title>
        <meta name="description" content={item.description} />
      </Head>

      <main className={styles.main}>
        <div className={styles.itemLayout}>
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <span className={styles.placeholderIcon}>👕</span>
            </div>
            <div className={styles.thumbnails}>
              {[1, 2, 3, 4].map((thumb) => (
              <div key={thumb} className={styles.thumbnail}>
                <span>📷</span>
              </div>
            ))}
            </div>
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.itemInfo}>
              <div className={styles.brand}>{item.brand}</div>
              <h1 className={styles.itemTitle}>{item.name}</h1>

              <div className={styles.rating}>
                <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
                <span className={styles.ratingText}>
                  {item.rating} ({item.reviews} reviews)
                </span>
              </div>

              <div className={styles.pricing}>
                <span className={styles.currentPrice}>{item.price}</span>
                <span className={styles.originalPrice}>{item.originalPrice}</span>
              </div>

              <p className={styles.description}>{item.description}</p>
            </div>

            <div className={styles.options}>
              <div className={styles.sizeSelector}>
                <h3>Size</h3>
                <div className={styles.sizeOptions}>
                  {item.sizes.map((size) => (
                    <button
                      key={size}
                      className={`${styles.sizeButton} ${
                        selectedSize === size ? styles.selected : ''
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.colorSelector}>
                <h3>Màu sắc</h3>
                <div className={styles.colorOptions}>
                  {item.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`${styles.colorButton} ${
                        selectedColor === color.name ? styles.selected : ''
                      }`}
                      onClick={() => setSelectedColor(color.name)}
                      style={{ backgroundColor: color.color }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.features}>
              <h3>Đặc điểm sản phẩm</h3>
              <ul className={styles.featureList}>
                {item.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.actions}>
              <a 
                href={item.shopeeLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.shopeeButton}
              >
                Mua trên Shopee
              </a>
              <a 
                href={item.tiktokLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.tiktokButton}
              >
                Mua trên TikTok
              </a>
            </div>

            <div className={styles.tags}>
              {item.tags.map((tag, index) => (
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

export default ItemDetail;