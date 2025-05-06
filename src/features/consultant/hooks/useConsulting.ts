import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ConsultingProject } from '../types';

export const useConsulting = () => {
  const { i18n, t } = useTranslation('consultant');
  const [consulting, setConsulting] = useState<ConsultingProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConsultingData = async () => {
      setLoading(true);
      try {
        // Load data based on current language
        const lang = i18n.language || 'en';
        const data = await import(`../data/${lang}.json`);
        setConsulting(data.consulting);
      } catch (error) {
        console.error('Error loading consulting data:', error);
        // Fallback to English if the specific language file fails to load
        try {
          const fallbackData = await import(`../data/en.json`);
          setConsulting(fallbackData.consulting);
        } catch (fallbackError) {
          console.error('Error loading fallback consulting data:', fallbackError);
          setConsulting([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadConsultingData();
  }, [i18n.language]);

  const tags = useMemo(() => {
    return [...new Set(consulting.flatMap(project => project.tags))];
  }, [consulting]);

  return {
    consulting,
    tags,
    loading
  };
};