
import { useRouter } from 'next/router';
import en from '../locales/en.json';
import vi from '../locales/vi.json';

const translations = {
  en,
  vi,
};

export const useTranslation = () => {
  const { locale } = useRouter();
  const currentLocale = locale || 'vi';
  
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[currentLocale as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t, locale: currentLocale };
};
