
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Outfit.module.css';

const OutfitDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('default');

  const outfit = {
    id: id,
    name: 'Casual Denim Look',
    description: 'Perfect for everyday wear with a relaxed yet stylish vibe',
    price: '$89',
    rating: 4.8,
    reviews: 127,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'default', label: 'Original', color: '#4169E1' },
      { name: 'black', label: 'Black', color: '#000000' },
      { name: 'white', label: 'White', color: '#FFFFFF' }
    ],
    items: [
      { name: 'Denim Jacket', brand: 'Urban Style', price: '$45' },
      { name: 'White T-Shirt', brand: 'Basic Tee', price: '$15' },
      { name: 'Blue Jeans', brand: 'Comfort Fit', price: '$29' }
    ],
    tags: ['casual', 'comfortable', 'versatile']
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{outfit.name} - StyleBook</title>
        <meta name="description" content={outfit.description} />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <button className={styles.backButton}>← Back to Lookbook</button>
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.outfitLayout}>
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <span className={styles.placeholderIcon}>👗</span>
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
            <div className={styles.outfitInfo}>
              <h1 className={styles.outfitTitle}>{outfit.name}</h1>
              <div className={styles.rating}>
                <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
                <span className={styles.ratingText}>
                  {outfit.rating} ({outfit.reviews} reviews)
                </span>
              </div>
              <p className={styles.description}>{outfit.description}</p>
              <div className={styles.price}>{outfit.price}</div>
            </div>

            <div className={styles.options}>
              <div className={styles.sizeSelector}>
                <h3>Size</h3>
                <div className={styles.sizeOptions}>
                  {outfit.sizes.map((size) => (
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
                <h3>Color Variation</h3>
                <div className={styles.colorOptions}>
                  {outfit.colors.map((color) => (
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

            <div className={styles.actions}>
              <button className={styles.addToWardrobeButton}>
                Add to My Wardrobe
              </button>
              <button className={styles.shareButton}>Share Look</button>
            </div>

            <div className={styles.itemBreakdown}>
              <h3>What's Included</h3>
              <div className={styles.items}>
                {outfit.items.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemBrand}>{item.brand}</span>
                    <span className={styles.itemPrice}>{item.price}</span>
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
