
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/LanguageSwitcher.module.css';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  return (
    <div className={styles.languageSwitcher}>
      <Link href={{ pathname, query }} as={asPath} locale="vi">
        <button 
          className={`${styles.langButton} ${router.locale === 'vi' ? styles.active : ''}`}
        >
          VI
        </button>
      </Link>
      <Link href={{ pathname, query }} as={asPath} locale="en">
        <button 
          className={`${styles.langButton} ${router.locale === 'en' ? styles.active : ''}`}
        >
          EN
        </button>
      </Link>
    </div>
  );
};
