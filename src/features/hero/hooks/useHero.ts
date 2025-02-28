import { useTranslation } from 'react-i18next';

export const useHero = () => {
  const { t } = useTranslation();

  const heroContent = {
    name: t('hero.name'),
    profileImage: t('hero.profileImage')
  };

  return { heroContent };
};