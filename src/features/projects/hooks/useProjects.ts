import { useTranslation } from 'react-i18next';
import { Project } from '../types';

export const useProjects = () => {
  const { t } = useTranslation('projectsData');
  
  const projects: Project[] = t('projects', { returnObjects: true }) as Project[];

  return { projects };
};