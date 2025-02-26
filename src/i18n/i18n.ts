import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 引入語系檔
import translationEN from './locales/en/translation.json';
import translationTW from './locales/zh/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  tw: {
    translation: translationTW
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tw',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;