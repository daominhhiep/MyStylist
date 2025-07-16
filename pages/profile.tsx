
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Auth.module.css'

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userProfile, setUserProfile] = useState({
    height: '',
    weight: '',
    bodyType: '',
    preferredStyle: '',
    size: ''
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    // Load user profile from localStorage
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile))
    alert('Thông tin đã được lưu thành công!')
  }

  if (status === 'loading') {
    return <div>Đang tải...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Thông tin cá nhân - OutfitAI</title>
        <meta name="description" content="Quản lý thông tin cá nhân" />
      </Head>

      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <Link href="/" className={styles.backButton}>
            ← Về trang chủ
          </Link>
          <h1 className={styles.profileTitle}>Thông tin cá nhân</h1>
          <p className={styles.profileSubtitle}>Cập nhật thông tin để có trải nghiệm tốt nhất với gợi ý AI</p>
        </div>

        <div className={styles.userInfo}>
          <img 
            src={session.user?.image || '/default-avatar.png'} 
            alt="Avatar"
            className={styles.userAvatar}
          />
          <div className={styles.userDetails}>
            <div className={styles.userName}>{session.user?.name}</div>
            <div className={styles.userEmail}>{session.user?.email}</div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className={styles.signOutButton}
          >
            Đăng xuất
          </button>
        </div>

        <div className={styles.profileForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="height">Chiều cao (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={userProfile.height}
                onChange={handleInputChange}
                placeholder="Ví dụ: 170"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="weight">Cân nặng (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={userProfile.weight}
                onChange={handleInputChange}
                placeholder="Ví dụ: 65"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bodyType">Vóc dáng</label>
              <select
                id="bodyType"
                name="bodyType"
                value={userProfile.bodyType}
                onChange={handleInputChange}
              >
                <option value="">Chọn vóc dáng</option>
                <option value="slim">Gầy</option>
                <option value="average">Trung bình</option>
                <option value="curvy">Đầy đặn</option>
                <option value="athletic">Thể thao</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="size">Size thường mặc</label>
              <select
                id="size"
                name="size"
                value={userProfile.size}
                onChange={handleInputChange}
              >
                <option value="">Chọn size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="preferredStyle">Phong cách yêu thích</label>
              <select
                id="preferredStyle"
                name="preferredStyle"
                value={userProfile.preferredStyle}
                onChange={handleInputChange}
              >
                <option value="">Chọn phong cách</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="streetwear">Streetwear</option>
                <option value="vintage">Vintage</option>
                <option value="minimalist">Minimalist</option>
                <option value="bohemian">Bohemian</option>
              </select>
            </div>
          </div>

          <button onClick={handleSave} className={styles.saveButton}>
            Lưu thông tin
          </button>
        </div>
      </div>
    </div>
  )
}
