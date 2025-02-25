import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import './styles/LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = {
    tw: '中文',
    en: 'English'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button 
        className="lang-select-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {languages[i18n.language as keyof typeof languages]}
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="lang-dropdown">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              className={`lang-option ${code === i18n.language ? 'active' : ''}`}
              onClick={() => changeLanguage(code)}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;