import { useTranslation } from 'react-i18next';
import { useHero } from '../hooks/useHero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  const { heroContent } = useHero();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
      </div>

      <div className="hero-content">
        <div className="hero-grid-container">
          <div className="hero-text">
            <div className="hero-title">
              <span className="greeting">{t('hero.greeting')}</span>
              <h1>{heroContent.name}</h1>
              <span className="role">{t('hero.role')}</span>
            </div>
            <p className="hero-description">{t('hero.description')}</p>

            <div className="hero-cta">
              <button className="btn primary" onClick={() => scrollToSection('#projects')}>
                {t('hero.cta.portfolio')}
              </button>
              <button className="btn secondary" onClick={() => scrollToSection('#contact')}>
                {t('hero.cta.contact')}
              </button>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/Lung-Yu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/lung-yu-tsai-633865100/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="mailto:workfile975@gmail.com"
                aria-label="Email">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-backdrop"></div>
            <img src={heroContent.profileImage} alt={heroContent.name} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;