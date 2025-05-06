import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { SkillTreeData } from '../types/tree/index';

export const useSkillsTree = () => {
  const { i18n } = useTranslation();
  const [skillTreeData, setSkillTreeData] = useState<SkillTreeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSkillTree = async () => {
      setLoading(true);
      try {
        // Dynamically load data based on current language
        const lang = i18n.language || 'en';
        const module = await import(`../data/tree/${lang}.json`);
        setSkillTreeData(module.default as SkillTreeData);
      } catch (error) {
        console.error('Error loading skills tree data:', error);
        // Fallback to English if specific language data fails to load
        try {
          const fallbackModule = await import(`../data/tree/en.json`);
          setSkillTreeData(fallbackModule.default as SkillTreeData);
        } catch (fallbackError) {
          console.error('Error loading fallback skills tree data:', fallbackError);
          setSkillTreeData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadSkillTree();
  }, [i18n.language]); // Reload when language changes

  return { skillTreeData, loading };
};
