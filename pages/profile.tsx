import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../components/AuthProvider';
import { db } from '../lib/firebase';
import styles from '../styles/Auth.module.css';

export default function Profile() {
  const {user, userProfile, signOut, loading} = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    bodyType: '',
    preferredStyle: '',
    size: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        height: userProfile.height || '',
        weight: userProfile.weight || '',
        bodyType: userProfile.bodyType || '',
        preferredStyle: userProfile.preferredStyle || '',
        size: userProfile.size || ''
      });
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ...formData,
        updatedAt: new Date().toISOString()
      });
      alert('Thông tin đã được lưu thành công!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Có lỗi xảy ra khi lưu thông tin!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <h1 className={styles.profileTitle}>Thông tin cá nhân</h1>
          <p className={styles.profileSubtitle}>Cập nhật thông tin để có trải nghiệm tốt nhất với gợi ý AI</p>
        </div>

        <div className={styles.userInfo}>
          <img
            src={user.photoURL || '/default-avatar.png'}
            alt="Avatar"
            className={styles.userAvatar}
          />
          <div className={styles.userDetails}>
            <div className={styles.userName}>{user.displayName}</div>
            <div className={styles.userEmail}>{user.email}</div>
          </div>
          <button
            onClick={signOut}
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
                value={formData.height}
                onChange={handleInputChange}
                placeholder="Nhập chiều cao"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="weight">Cân nặng (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="Nhập cân nặng"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bodyType">Vóc dáng</label>
              <select
                id="bodyType"
                name="bodyType"
                value={formData.bodyType}
                onChange={handleInputChange}
              >
                <option value="">Chọn vóc dáng</option>
                <option value="slim">Gầy</option>
                <option value="athletic">Thể thao</option>
                <option value="average">Trung bình</option>
                <option value="curvy">Đầy đặn</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="preferredStyle">Phong cách yêu thích</label>
              <select
                id="preferredStyle"
                name="preferredStyle"
                value={formData.preferredStyle}
                onChange={handleInputChange}
              >
                <option value="">Chọn phong cách</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="streetwear">Streetwear</option>
                <option value="vintage">Vintage</option>
                <option value="minimalist">Minimalist</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="size">Kích thước</label>
              <select
                id="size"
                name="size"
                value={formData.size}
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
          </div>

          <button
            onClick={handleSave}
            className={styles.saveButton}
            disabled={saving}
          >
            {saving ? 'Đang lưu...' : 'Lưu thông tin'}
          </button>
        </div>
      </div>
    </div>
  );
}
