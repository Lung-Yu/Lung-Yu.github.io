import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import HeroButtons from './HeroButtons';
import '../styles/Hero.css';
import '../styles/HeroButtons.css';
import { FloatingOrbs } from '../../floatingOrbs';
import { useHero } from '../hooks/useHero';

const Hero: React.FC = () => {
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
              <span className="greeting">{heroContent.greeting}</span>
              <h1>{heroContent.name}</h1>
              <span className="role">{heroContent.role}</span>
            </div>
            <p className="hero-description">{heroContent.description}</p>

            <HeroButtons onNavigate={scrollToSection} />

          {/* Social links */}
          <div className="social-links">
            <a
              href={heroContent.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-tooltip="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} className="icon" />
            </a>
            <a
              href={heroContent.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-tooltip="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} className="icon" />
            </a>
            <a
              href={`mailto:${heroContent.socialLinks.email}`}
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