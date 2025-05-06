import { useTranslation } from 'react-i18next';
import { Project } from '../types';

export const useProjects = () => {
  const { t } = useTranslation('projectsData');

  const projects: Project[] = t('projects', { returnObjects: true }) as Project[];

  // sort projects by endDate, startDate in descending order
  const sortedProjects = projects.sort((a, b) => {
    const endDateComparison = new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    if (endDateComparison !== 0) {
      return endDateComparison;
    }
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  return { projects: sortedProjects };
};