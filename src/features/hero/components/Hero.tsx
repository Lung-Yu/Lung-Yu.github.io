import { useTranslation } from 'react-i18next';
import { useHero } from '../hooks/useHero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/Hero.css';
import { FloatingOrbs } from '../../floatingOrbs';

/**
 * Hero 組件 - 網站首頁的主要展示區域
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
          {/* 文字內容區 */}
          <div className="hero-text">
            <div className="hero-title">
              <span className="greeting">{t('hero.greeting')}</span>
              <h1>{heroContent.name}</h1>
              <span className="role">{t('hero.role')}</span>
            </div>
            <p className="hero-description">{t('hero.description')}</p>

            {/* 按鈕區域 */}
            <div className="hero-cta">
              <button 
                className="btn primary" 
                onClick={() => scrollToSection('#projects')}
                aria-label={t('hero.cta.portfolio')}
              >
                {t('hero.cta.portfolio')}
              </button>
              <button 
                className="btn secondary" 
                onClick={() => scrollToSection('#contact')}
                aria-label={t('hero.cta.contact')}
              >
                {t('hero.cta.contact')}
              </button>
            </div>

            {/* 社交連結 */}
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

          {/* 圖片區域 */}
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