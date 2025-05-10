// src/features/cv/hooks/useCV.ts
import { useTranslation } from 'react-i18next';
import type { CVData } from '../types';

export const useCV = () => {
  const { t, ready } = useTranslation('cv');

  // 獲取翻譯陣列，加強錯誤處理
  const getTranslatedArray = <T>(key: string): T[] => {
    try {
      const data = t(key, { returnObjects: true });
      return Array.isArray(data) ? data as T[] : [];
    } catch (error) {
      console.error(`Translation error for key ${key}:`, error);
      return [];
    }
  };
  
  // 安全地獲取翻譯字符串，帶有默認值
  const getSafeTranslation = (key: string, defaultValue: string = ''): string => {
    try {
      const result = t(key);
      return typeof result === 'string' ? result : defaultValue;
    } catch (error) {
      console.error(`Translation error for key ${key}:`, error);
      return defaultValue;
    }
  };

  const cvData: CVData = {
    name: getSafeTranslation('name'),
    title: getSafeTranslation('title'),
    summary: getSafeTranslation('summary'),
    email: getSafeTranslation('email', 'workfile975@gmail.com'),
    phone: getSafeTranslation('phone'),
    location: getSafeTranslation('location'),
    website: getSafeTranslation('website'),
    websiteUrl: getSafeTranslation('websiteUrl'),
    linkedin: getSafeTranslation('linkedin'),
    sections: {
      skills: getSafeTranslation('sections.skills', '技能'),
      experience: getSafeTranslation('sections.experience', '經歷'),
      education: getSafeTranslation('sections.education', '學歷'),
      conferences: getSafeTranslation('sections.conferences', '演講/議程')
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