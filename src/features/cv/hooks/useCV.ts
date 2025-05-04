// src/features/cv/hooks/useCV.ts
import { useTranslation } from 'react-i18next';
import type { CVData } from '../types';

export const useCV = () => {
  const { t, ready } = useTranslation('cv');

  const getTranslatedArray = <T>(key: string): T[] => {
    try {
      const data = t(key, { returnObjects: true });
      return Array.isArray(data) ? data as T[] : [];
    } catch (error) {
      console.error(`Translation error for key ${key}:`, error);
      return [];
    }
  };

  const cvData: CVData = {
    name: t('name', { defaultValue: '' }),
    title: t('title', { defaultValue: '' }),
    summary: t('summary', { defaultValue: '' }),
    email: t('email', { defaultValue: 'workfile975@gmail.com' }),
    phone: t('phone', { defaultValue: '' }),
    location: t('location', { defaultValue: '' }),
    website: t('website', { defaultValue: '' }),
    linkedin: t('linkedin', { defaultValue: '' }),
    sections: {
      skills: t('sections.skills', { defaultValue: '技能' }),
      experience: t('sections.experience', { defaultValue: '經歷' }),
      education: t('sections.education', { defaultValue: '學歷' }),
      conferences: t('sections.conferences', { defaultValue: '演講/議程' })
    },
    skills: getTranslatedArray<CVData['skills'][0]>('skills'),
    experiences: getTranslatedArray<CVData['experiences'][0]>('experiences'),
    education: getTranslatedArray<CVData['education'][0]>('education'),
    conferences: getTranslatedArray<CVData['conferences'][0]>('conferences')
  };

  return { 
    cvData,
    isLoading: !ready,
    t  // 新增回傳 t 函數
  };
};