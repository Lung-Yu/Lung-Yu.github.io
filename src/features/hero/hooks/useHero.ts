import { useMemo } from 'react';
import heroJson from '../data/hero.json';
import type { HeroContent } from '../types';

export const useHero = () => {
  const heroContent = useMemo(() => {
    return heroJson.hero as HeroContent;
  }, []);

  return { heroContent };
};