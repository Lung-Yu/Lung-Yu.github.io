import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ConsultingProject } from '../types';

export const useConsulting = () => {
  const { t } = useTranslation('consultant');
  
  const consulting = useMemo(() => {
    const data: ConsultingProject[] = t('consultingData.list', { returnObjects: true });
    return data;
  }, [t]);

  const tags = useMemo(() => {
    return [...new Set(consulting.flatMap(project => project.tags))];
  }, [consulting]);

  return {
    consulting,
    tags
  };
};