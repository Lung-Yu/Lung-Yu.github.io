import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import HeroButtons from './HeroButtons';
import '../styles/Hero.css';
import '../styles/HeroButtons.css';
import { FloatingOrbs } from '../../floatingOrbs';
import { useHero } from '../hooks/useHero';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { heroContent } = useHero();
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" aria-label={t('hero.sectionAriaLabel', 'Hero section')}>
      <FloatingOrbs />
      <div className="hero-content">
        <div className="hero-grid-container">
          {/* Text content area */}
          <div className="hero-text">
            <div className="hero-title">
              <span className="greeting">{t('hero.greeting', heroContent.greeting)}</span>
              <h1>{t('hero.name', heroContent.name)}</h1>
              <span className="role">{t('hero.role', heroContent.role)}</span>
            </div>
            <p className="hero-description">{t('hero.description', heroContent.description)}</p>

            <HeroButtons onNavigate={scrollToSection} />

            {/* Social links */}
            <div className="social-links" aria-label={t('hero.socialLinksLabel', 'Social media links')}>
              <a
                href={heroContent.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('hero.socialLinks.github', 'GitHub')}
                data-tooltip={t('hero.socialLinks.github', 'GitHub')}
              >
                <FontAwesomeIcon icon={faGithub} className="icon" />
              </a>
              <a
                href={heroContent.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('hero.socialLinks.linkedin', 'LinkedIn')}
                data-tooltip={t('hero.socialLinks.linkedin', 'LinkedIn')}
              >
                <FontAwesomeIcon icon={faLinkedin} className="icon" />
              </a>
              <a
                href={`mailto:${heroContent.socialLinks.email}`}
                aria-label={t('hero.socialLinks.email', 'Email')}
                data-tooltip={t('hero.socialLinks.email', 'Email')}
              >
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
              </a>
            </div>
          </div>

          {/* Image area */}
          <div className="hero-image">
            <div className="image-backdrop" aria-hidden="true" />
            <img 
              src={heroContent.profileImage} 
              alt={t('hero.profileImageAlt', 'Profile picture of {{name}}', { name: t('hero.name', heroContent.name) })}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;