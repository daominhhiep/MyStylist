import React from 'react';
import { auth } from '../../lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import styles from '../../styles/Auth.module.css';

const SignIn: React.FC = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Redirect or perform other actions after successful login
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signInBox}>
        <h2 className={styles.title}>Đăng nhập</h2>
        <p className={styles.subtitle}>Đăng nhập để tiếp tục</p>
        <button onClick={signInWithGoogle} className={styles.signInButton}>
          Đăng nhập với Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;