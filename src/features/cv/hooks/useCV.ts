// src/features/cv/hooks/useCV.ts
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cvTW from '../data/cv.tw.json';
import cvEN from '../data/cv.en.json';
import type { CVData } from '../types';

export const useCV = () => {
  const { i18n } = useTranslation();
  
  const cvData = useMemo(() => {
    try {
      const data = i18n.language === 'en' ? cvEN.cv : cvTW.cv;
      console.log('CV Data:', data);
      return data as CVData;
    } catch (error) {
      console.error('Error loading CV data:', error);
      return null;
    }
  }, [i18n.language]);

  return { cvData };
};