import { useTranslation } from 'react-i18next';
import { Project } from '../types';

export const useProjects = () => {
  const { t } = useTranslation('projectsData');
  
  // 從翻譯檔案獲取專案資料
  const projects: Project[] = t('projects', { returnObjects: true });

  return { projects };
};