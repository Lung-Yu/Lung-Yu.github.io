import { useTranslation } from 'react-i18next';
import type { SkillsData } from '../types';

export const useSkills = () => {
  const { t } = useTranslation('skills');
  
  const skills: SkillsData = {
    categories: {
      security: {
        title: t('categories.security.title'),
        description: t('categories.security.description')
      },
      development: {
        title: t('categories.development.title'),
        description: t('categories.development.description')
      },
      devops: {
        title: t('categories.devops.title'),
        description: t('categories.devops.description')
      }
    },
    items: {
      security: [
        t('items.security.pentest'),
        t('items.security.incident'),
        t('items.security.sdlc'),
        t('items.security.architecture'),
        t('items.security.compliance')
      ],
      development: [
        t('items.development.frontend'),
        t('items.development.backend'),
        t('items.development.database'),
        t('items.development.api'),
        t('items.development.architecture')
      ],
      devops: [
        t('items.devops.cicd'),
        t('items.devops.container'),
        t('items.devops.automation'),
        t('items.devops.cloud'),
        t('items.devops.monitoring')
      ]
    }
  } as SkillsData;

  return { skills };
};
