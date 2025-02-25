// src/shared/components/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';
import './styles/LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button 
        className={`lang-btn ${i18n.language === 'tw' ? 'active' : ''}`}
        onClick={() => changeLanguage('tw')}>
        中文
      </button>
      <button 
        className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}>
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;