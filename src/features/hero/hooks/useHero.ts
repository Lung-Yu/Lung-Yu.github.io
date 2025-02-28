import { useTranslation } from 'react-i18next';

export const useHero = () => {
  const { t } = useTranslation('hero');

  const heroContent = {
    greeting: t('greeting'),
    name: t('name'),
    role: t('role'),
    description: t('description'),
    profileImage: t('profileImage'),
    socialLinks: {
      github: t('socialLinks.github'),
      linkedin: t('socialLinks.linkedin'),
      email: t('socialLinks.email')
    }
  };

  return { heroContent };
};