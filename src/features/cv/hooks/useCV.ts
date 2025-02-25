import { useMemo } from 'react';
import cvJson from '../data/cv.json';
import type { CVData } from '../types';

export const useCV = () => {
  const cvData = useMemo(() => {
    return cvJson.cv as CVData;
  }, []);

  return { cvData };
};