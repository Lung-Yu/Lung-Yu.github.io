import { Link } from 'react-router-dom';
import { useNavigation } from '../hooks/useNavigation';
import NavLink from './NavLink';
import '../styles/Navbar.css';

const Navbar = () => {
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
            Tygrus
          </Link>

          <button
            className={`nav-toggle ${isNavOpen ? 'active' : ''}`}
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div className={`nav-menu ${isNavOpen ? 'active' : ''}`}>
            {menuItems.map(item => (
              <NavLink 
                key={item.title} 
                item={item} 
                onNavClick={handleNavClick} 
              />
            ))}
          </div>
        </div>
      </nav>
      
      <div 
        className={`nav-overlay ${isNavOpen ? 'active' : ''}`}
        onClick={() => setIsNavOpen(false)}
      />
    </>
  );
};

export default Navbar;