import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '../hooks/useNavigation';
import NavLink from './NavLink';
import '../styles/NavigationBar.css';
import LanguageSwitcher from '../../../shared/components/LanguageSwitcher/LanguageSwitcher';

const NavigationBar = () => {
  const { t } = useTranslation('common');
  const { isScrolled, isNavOpen, setIsNavOpen, menuItems } = useNavigation();

  const handleNavClick = (href: string) => {
    setIsNavOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={() => setIsNavOpen(false)}>
            {t('navigation.home')}
          </Link>

          <button
            className={`nav-toggle ${isNavOpen ? 'active' : ''}`}
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label={t('navigation.toggleMenu')}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div className={`nav-menu ${isNavOpen ? 'active' : ''}`}>
            {menuItems.filter(item => item.title !== 'navigation.cv').map(item => (
              <NavLink 
                key={item.title} 
                item={item} 
                onNavClick={handleNavClick} 
              />
            ))}
          </div>
          <LanguageSwitcher />
        </div>
      </nav>
      
      <div 
        className={`nav-overlay ${isNavOpen ? 'active' : ''}`}
        onClick={() => setIsNavOpen(false)}
      />
    </>
  );
};

export default NavigationBar;