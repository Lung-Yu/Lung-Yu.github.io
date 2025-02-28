import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 引入所有頁面的語系檔
import commonEN from './locales/en/common.json';
import commonTW from './locales/zh/common.json';
import heroEN from './locales/en/hero.json';
import heroTW from './locales/zh/hero.json';
import projectsEN from './locales/en/projects.json'; // Ensure this file exists at the specified path
import projectsTW from './locales/zh/projects.json';
import aboutEN from './locales/en/about.json';
import aboutTW from './locales/zh/about.json';
import experienceEN from './locales/en/experience.json';
import experienceTW from './locales/zh/experience.json';
import servicesEN from './locales/en/services.json';
import servicesTW from './locales/zh/services.json';
import projectsDataEN from './locales/en/projectsData.json';
import projectsDataTW from './locales/zh/projectsData.json';
import consultantEN from './locales/en/consultant.json';
import consultantTW from './locales/zh/consultant.json';

const resources = {
  en: {
    common: commonEN,
    hero: heroEN,
    projects: projectsEN,
    about: aboutEN,
    experience: experienceEN,
    services: servicesEN,
    projectsData: projectsDataEN,
    consultant: consultantEN
  },
  tw: {
    common: commonTW,
    hero: heroTW,
    projects: projectsTW,
    about: aboutTW,
    experience: experienceTW,
    services: servicesTW,
    projectsData: projectsDataTW,
    consultant: consultantTW
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    fallbackLng: 'tw',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;