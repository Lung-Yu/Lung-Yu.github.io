import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { SkillsData } from '../types';

export const useSkills = () => {
  const { i18n } = useTranslation();
  const [skills, setSkills] = useState<SkillsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSkills = async () => {
      setLoading(true);
      try {
        // Dynamically load data based on current language
        const lang = i18n.language || 'en';
        const module = await import(`../data/${lang}.json`);
        setSkills(module.default as SkillsData);
      } catch (error) {
        console.error('Error loading skills data:', error);
        // Fallback to English if specific language data fails to load
        try {
          const fallbackModule = await import(`../data/en.json`);
          setSkills(fallbackModule.default as SkillsData);
        } catch (fallbackError) {
          console.error('Error loading fallback skills data:', fallbackError);
          setSkills(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, [i18n.language]); // Reload when language changes

  return { skills, loading };
};
