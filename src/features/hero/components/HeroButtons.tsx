// src/features/hero/components/HeroButtons.tsx
import { useTranslation } from 'react-i18next';

interface HeroButtonsProps {
  onNavigate: (sectionId: string) => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="hero-cta">
      <button 
        className="btn primary" 
        onClick={() => onNavigate('#projects')}
        aria-label={t('hero.cta.portfolio')}
      >
        {t('hero.cta.portfolio')}
      </button>
      <button 
        className="btn secondary" 
        onClick={() => onNavigate('#contact')}
        aria-label={t('hero.cta.contact')}
      >
        {t('hero.cta.contact')}
      </button>
    </div>
  );
};

export default HeroButtons;