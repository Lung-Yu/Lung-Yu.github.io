// src/features/hero/components/Hero.tsx
import { useTranslation } from 'react-i18next';
import { useHero } from '../hooks/useHero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import HeroButtons from './HeroButtons';
import '../styles/Hero.css';
import '../styles/HeroButtons.css';
import { FloatingOrbs } from '../../floatingOrbs';

/**
 * Hero component - Main showcase area of the homepage
 */
const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { heroContent } = useHero();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <FloatingOrbs />
      <div className="hero-content">
        <div className="hero-grid-container">
          {/* Text content area */}
          <div className="hero-text">
            <div className="hero-title">
              <span className="greeting">{t('hero.greeting')}</span>
              <h1>{heroContent.name}</h1>
              <span className="role">{t('hero.role')}</span>
            </div>
            <p className="hero-description">{t('hero.description')}</p>

            <HeroButtons onNavigate={scrollToSection} />

          {/* Social links */}
          <div className="social-links">
            <a
              href="https://github.com/Lung-Yu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-tooltip="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} className="icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/lung-yu-tsai-633865100/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-tooltip="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} className="icon" />
            </a>
            <a
              href="mailto:workfile975@gmail.com"
              aria-label="Email"
              data-tooltip="Email"
            >
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
            </a>
          </div>
        </div>

          {/* Image area */}
          <div className="hero-image">
            <div className="image-backdrop" />
            <img 
              src={heroContent.profileImage} 
              alt={heroContent.name}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;