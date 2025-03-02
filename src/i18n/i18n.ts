import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 引入所有頁面的語系檔
import commonEN from './locales/en/common.json';
import commonTW from './locales/zh-TW/common.json';
import heroEN from './locales/en/hero.json';
import heroTW from './locales/zh-TW/hero.json';
import projectsEN from './locales/en/projects.json'; // Ensure this file exists at the specified path
import projectsTW from './locales/zh-TW/projects.json';
import aboutEN from './locales/en/about.json';
import aboutTW from './locales/zh-TW/about.json';
import experienceEN from './locales/en/experience.json';
import experienceTW from './locales/zh-TW/experience.json';
import servicesEN from './locales/en/services.json';
import servicesTW from './locales/zh-TW/services.json';
import projectsDataEN from './locales/en/projectsData.json';
import projectsDataTW from './locales/zh-TW/projectsData.json';
import consultantEN from './locales/en/consultant.json';
import consultantTW from './locales/zh-TW/consultant.json';
import cvEN from './locales/en/cv.json';
import cvTW from './locales/zh-TW/cv.json';
import certificatesEN from './locales/en/certificates.json';
import certificatesTW from './locales/zh-TW/certificates.json';

const resources = {
  en: {
    common: commonEN,
    hero: heroEN,
    projects: projectsEN,
    about: aboutEN,
    experience: experienceEN,
    services: servicesEN,
    projectsData: projectsDataEN,
    consultant: consultantEN,
    cv: cvEN,
    certificates: certificatesEN
  },
  'zh-TW': {
    common: commonTW,
    hero: heroTW,
    projects: projectsTW,
    about: aboutTW,
    experience: experienceTW,
    services: servicesTW,
    projectsData: projectsDataTW,
    consultant: consultantTW,
    cv: cvTW,
    certificates: certificatesTW
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    fallbackLng: 'zh-TW',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;