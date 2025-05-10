import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 引入所有頁面的語系檔
import commonEN from './locales/en/common.json';
import commonTW from './locales/zh-TW/common.json';
import heroEN from './locales/en/hero.json';
import heroTW from './locales/zh-TW/hero.json';
import projectsEN from './locales/en/projects.json'; // UI translations only, not project data
import projectsTW from './locales/zh-TW/projects.json';
import aboutEN from './locales/en/about.json';
import aboutTW from './locales/zh-TW/about.json';
import experienceEN from './locales/en/experience.json';
import experienceTW from './locales/zh-TW/experience.json';
import servicesEN from './locales/en/services.json';
import servicesTW from './locales/zh-TW/services.json';
import consultantEN from './locales/en/consultant.json';
import consultantTW from './locales/zh-TW/consultant.json';
import cvEN from './locales/en/cv.json';
import cvTW from './locales/zh-TW/cv.json';
import certificatesEN from './locales/en/certificates.json'; // UI translations only, not certificates data
import certificatesTW from './locales/zh-TW/certificates.json';
import skillsEN from './locales/en/skills.json'; // UI translations only, not skills data
import skillsTW from './locales/zh-TW/skills.json';
import appsEN from './locales/en/apps.json'; // UI translations for app components
import appsTW from './locales/zh-TW/apps.json';

const resources = {
  en: {
    common: commonEN,
    hero: heroEN,
    projects: projectsEN,
    about: aboutEN,
    experience: experienceEN,
    services: servicesEN,
    consultant: consultantEN,
    cv: cvEN,
    certificates: certificatesEN,
    skills: skillsEN,
    apps: appsEN
  },
  'zh-TW': {
    common: commonTW,
    hero: heroTW,
    projects: projectsTW,
    about: aboutTW,
    experience: experienceTW,
    services: servicesTW,
    consultant: consultantTW,
    cv: cvTW,
    certificates: certificatesTW,
    skills: skillsTW,
    apps: appsTW
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