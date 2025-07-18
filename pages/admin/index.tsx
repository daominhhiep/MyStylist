import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Admin.module.css';

interface Product {
  id: string;
  name: string;
  category: string;
  style: string;
  image: string;
  affiliateLink: string;
  label: 'HOT' | 'SPONSORED' | 'TRENDING' | null;
  clicks: number;
}

const AdminDashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Oversized Streetwear Hoodie',
      category: 'tops',
      style: 'streetwear',
      image: '/hoodie.jpg',
      affiliateLink: 'https://shope.ee/example1',
      label: 'HOT',
      clicks: 127
    },
    {
      id: '2',
      name: 'Basic White T-Shirt',
      category: 'tops',
      style: 'basic',
      image: '/tshirt.jpg',
      affiliateLink: 'https://tiktok.com/shop/example2',
      label: 'TRENDING',
      clicks: 89
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'tops',
    style: 'basic',
    image: '',
    affiliateLink: '',
    label: null as Product['label']
  });

  const addProduct = () => {
    if (newProduct.name && newProduct.affiliateLink) {
      const product: Product = {
        id: Date.now().toString(),
        ...newProduct,
        clicks: 0
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        category: 'tops',
        style: 'basic',
        image: '',
        affiliateLink: '',
        label: null
      });
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const getLabelEmoji = (label: Product['label']) => {
    switch (label) {
      case 'HOT': return '🔥';
      case 'SPONSORED': return '💰';
      case 'TRENDING': return '📈';
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1>👗 Admin</h1>
          <Link href="/">
            <button className={styles.backButton}>← Về trang chủ</button>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.uploadSection}>
          <h2>Add New Product</h2>
          <div className={styles.form}>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className={styles.input}
            />

            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              className={styles.select}
            >
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="dresses">Dresses</option>
              <option value="accessories">Accessories</option>
            </select>

            <select
              value={newProduct.style}
              onChange={(e) => setNewProduct({...newProduct, style: e.target.value})}
              className={styles.select}
            >
              <option value="streetwear">Streetwear</option>
              <option value="basic">Basic</option>
              <option value="vintage">Vintage</option>
              <option value="clean">Clean</option>
              <option value="formal">Formal</option>
            </select>

            <input
              type="url"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              className={styles.input}
            />

            <input
              type="url"
              placeholder="Shopee/TikTok Shop Link"
              value={newProduct.affiliateLink}
              onChange={(e) => setNewProduct({...newProduct, affiliateLink: e.target.value})}
              className={styles.input}
            />

            <select
              value={newProduct.label || ''}
              onChange={(e) => setNewProduct({...newProduct, label: e.target.value as Product['label'] || null})}
              className={styles.select}
            >
              <option value="">No Label</option>
              <option value="HOT">🔥 HOT</option>
              <option value="SPONSORED">💰 Sponsored</option>
              <option value="TRENDING">📈 Trending</option>
            </select>

            <button onClick={addProduct} className={styles.addButton}>
              Add Product
            </button>
          </div>
        </section>

        <section className={styles.statsSection}>
          <h2>Product Statistics</h2>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productHeader}>
                  <h3>{product.name}</h3>
                  {product.label && (
                    <span className={styles.label}>
                      {getLabelEmoji(product.label)} {product.label}
                    </span>
                  )}
                </div>
                <p className={styles.productInfo}>
                  {product.category} • {product.style}
                </p>
                <div className={styles.stats}>
                  <span className={styles.clicks}>👆 {product.clicks} clicks</span>
                  <a 
                    href={product.affiliateLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    View Link
                  </a>
                </div>
                <button 
                  onClick={() => deleteProduct(product.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;