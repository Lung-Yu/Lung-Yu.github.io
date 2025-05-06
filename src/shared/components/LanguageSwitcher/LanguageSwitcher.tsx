import { useTranslation } from 'react-i18next';
import './styles/LanguageSwitcher.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = {
    'zh-TW': '中文',
    en: 'English'
  };

  const toggleLanguage = () => {
    // Toggle between English and Chinese
    const nextLang = i18n.language === 'en' ? 'zh-TW' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="language-switcher">
      <button 
        className="lang-toggle-btn"
        onClick={toggleLanguage}
        aria-label="Toggle language"
      >
        <FontAwesomeIcon icon={faLanguage} className="lang-icon" />
        <span>{languages[i18n.language as keyof typeof languages]}</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;