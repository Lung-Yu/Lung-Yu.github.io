import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { menuItems } from '../data/menuItemData';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    // 防止導航選單打開時滾動
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isNavOpen]);

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
              item.isExact ? (
                <Link
                  key={item.title}
                  to={item.href}
                  className="nav-link"
                  onClick={() => setIsNavOpen(false)}
                  {...(item.isNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.title}
                </Link>
              ) : (
                <a
                  key={item.title}
                  href={item.href}
                  className="nav-link"
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.title}
                </a>
              )
            ))}
          </div>
        </div>
      </nav>
      
      {/* 背景遮罩 */}
      <div 
        className={`nav-overlay ${isNavOpen ? 'active' : ''}`}
        onClick={() => setIsNavOpen(false)}
      />
    </>
  );
};

export default Navbar;