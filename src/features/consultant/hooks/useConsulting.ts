import { useMemo } from 'react';
import consultingJson from '../data/consulting.json';
import type { ConsultingProject } from '../types';

export const useConsulting = () => {
  const consulting = useMemo(() => {
    const data: ConsultingProject[] = consultingJson.consulting;
    return data;
  }, []);

  const tags = useMemo(() => {
    return [...new Set(consulting.flatMap(project => project.tags))];
  }, [consulting]);

  return {
    consulting,
    tags
  };
};