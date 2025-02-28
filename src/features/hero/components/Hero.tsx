import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import HeroButtons from './HeroButtons';
import '../styles/Hero.css';
import '../styles/HeroButtons.css';
import { FloatingOrbs } from '../../floatingOrbs';

const Hero: React.FC = () => {
  // 修改 useTranslation 使用方式，明確指定使用的翻譯檔案
  const { t } = useTranslation(['hero', 'common']); 

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
              <span className="greeting">{t('greeting')}</span>
              <h1>{t('name')}</h1>
              <span className="role">{t('role')}</span>
            </div>
            <p className="hero-description">{t('description')}</p>

            <HeroButtons onNavigate={scrollToSection} />

          {/* Social links */}
          <div className="social-links">
            <a
              href={t('socialLinks.github')}
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
              aria-label={t('socialLinks.linkedin')}
              data-tooltip={t('socialLinks.linkedin')}
            >
              <FontAwesomeIcon icon={faLinkedin} className="icon" />
            </a>
            <a
              href="mailto:workfile975@gmail.com"
              aria-label={t('socialLinks.email')}
              data-tooltip={t('socialLinks.email')}
            >
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
            </a>
          </div>
        </div>

          {/* Image area */}
          <div className="hero-image">
            <div className="image-backdrop" />
            <img 
              src={t('profileImage')} 
              alt={t('name')}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;