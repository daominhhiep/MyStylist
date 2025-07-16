import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/TryOn.module.css';

const TryOnPage = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const clothingItems = [
    { id: 1, name: 'Oversized Hoodie', category: 'tops', image: '/hoodie.jpg', style: 'streetwear' },
    { id: 2, name: 'Basic White Tee', category: 'tops', image: '/tshirt.jpg', style: 'basic' },
    { id: 3, name: 'Vintage Denim Jacket', category: 'tops', image: '/jacket.jpg', style: 'vintage' },
    { id: 4, name: 'Wide Leg Jeans', category: 'bottoms', image: '/jeans.jpg', style: 'clean' }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!selectedItem || !uploadedImage) {
      alert('Please select an item and upload your photo!');
      return;
    }

    setIsProcessing(true);

    // Simulate AI processing (in real implementation, this would call TryOnDiffusion API)
    setTimeout(() => {
      setResult({
        originalImage: uploadedImage,
        tryOnImage: uploadedImage, // In real app, this would be the AI-generated result
        item: selectedItem
      });
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className={styles.container}>
        <Head>
          <title>Thử đồ AI - OutfitAI</title>
          <meta name="description" content="Thử đồ thời trang với AI" />
        </Head>

        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.logo}>👗 OutfitAI</h1>

            <nav className={`${styles.nav} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
              <Link href="/" className={styles.navButton}>Trang chủ</Link>
              <Link href="/try-on" className={styles.navButton}>Thử đồ AI</Link>
              <Link href="/admin" className={styles.navButton}>Admin</Link>

              <div className={styles.mobileOnlyActions}>
                <div className={styles.languageSection}>
                  {/* Language switcher can be added here */}
                </div>
                {session ? (
                  <Link href="/profile" className={`${styles.navButton} ${styles.profileNavButton}`}>
                    <img 
                      src={session.user?.image || '/default-avatar.png'} 
                      alt="Profile"
                      className={styles.smallAvatar}
                    />
                    Thông tin cá nhân
                  </Link>
                ) : (
                  <Link href="/auth/signin" className={`${styles.navButton} ${styles.loginNavButton}`}>
                    Đăng nhập
                  </Link>
                )}
              </div>
            </nav>

            <div className={styles.headerActions}>
              {session ? (
                <Link href="/profile" className={styles.profileButton}>
                  <img 
                    src={session.user?.image || '/default-avatar.png'} 
                    alt="Profile"
                    className={styles.profileAvatar}
                  />
                  {session.user?.name}
                </Link>
              ) : (
                <Link href="/auth/signin" className={styles.loginButton}>
                  Đăng nhập
                </Link>
              )}
            </div>

            <div className={styles.mobileOnlyActions}>
              <button 
                className={styles.hamburger}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                ☰
              </button>
            </div>
          </div>
        </header>

      <main className={styles.main}>
        {!result ? (
          <div className={styles.tryOnInterface}>
            <div className={styles.step}>
              <h2>Step 1: Choose an Item</h2>
              <div className={styles.itemGrid}>
                {clothingItems.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.itemCard} ${
                      selectedItem?.id === item.id ? styles.selected : ''
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className={styles.itemImage}>
                      <span className={styles.itemEmoji}>👕</span>
                    </div>
                    <h3>{item.name}</h3>
                    <p>{item.style}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.step}>
              <h2>Step 2: Upload Your Photo</h2>
              <div className={styles.uploadArea}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={styles.uploadButton}
                >
                  {uploadedImage ? '✅ Photo Uploaded' : '📸 Upload Your Photo'}
                </button>
                {uploadedImage && (
                  <div className={styles.preview}>
                    <img src={uploadedImage} alt="Your photo" className={styles.previewImage} />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.step}>
              <h2>Step 3: Generate Try-On</h2>
              <button
                onClick={handleTryOn}
                disabled={!selectedItem || !uploadedImage || isProcessing}
                className={styles.generateButton}
              >
                {isProcessing ? '🤖 AI Processing...' : '✨ Try It On!'}
              </button>
              {isProcessing && (
                <div className={styles.processingInfo}>
                  <p>Our AI is working its magic...</p>
                  <div className={styles.loadingBar}>
                    <div className={styles.loadingProgress}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.resultSection}>
            <h2>Your Virtual Try-On Result</h2>
            <div className={styles.comparison}>
              <div className={styles.resultCard}>
                <h3>Original</h3>
                <img src={result.originalImage} alt="Original" className={styles.resultImage} />
              </div>
              <div className={styles.arrow}>→</div>
              <div className={styles.resultCard}>
                <h3>With {result.item.name}</h3>
                <img src={result.tryOnImage} alt="Try-on result" className={styles.resultImage} />
                <div className={styles.aiNote}>
                  <p>🤖 AI-Generated Try-On</p>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button 
                onClick={() => setResult(null)}
                className={styles.tryAgainButton}
              >
                Try Another Item
              </button>
              <Link href="/outfit/1">
                <button className={styles.shopButton}>
                  🛒 Shop This Look
                </button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TryOnPage;