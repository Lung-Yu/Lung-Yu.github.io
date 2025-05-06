// src/features/hero/components/HeroButtons.tsx
import { useHero } from '../hooks/useHero';

interface HeroButtonsProps {
  onNavigate: (sectionId: string) => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onNavigate }) => {
  const { heroContent } = useHero();

  return (
    <div className="hero-cta">
      <button 
        className="btn primary" 
        onClick={() => onNavigate('#projects')}
        aria-label={heroContent.cta.portfolio}
      >
        {heroContent.cta.portfolio}
      </button>
      <button 
        className="btn secondary" 
        onClick={() => onNavigate('#contact')}
        aria-label={heroContent.cta.contact}
      >
        {heroContent.cta.contact}
      </button>
    </div>
  );
};

export default HeroButtons;