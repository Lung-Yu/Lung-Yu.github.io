import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400); // 顯示回到頂部按鈕的閾值
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      title: '首頁',
      href: '/',
      isExact: true
    },
    {
      title: '專業技能',
      href: '#skills',
      isExact: false
    },
    {
      title: '作品集',
      href: '#projects',
      isExact: false
    },
    {
      title: '證照資歷',
      href: '#certificates',
      isExact: false
    },
    {
      title: '聯絡我',
      href: '#contact',
      isExact: false
    },
    {
      title: 'CV',
      href: '/cv',
      isExact: true,
      isNewTab: true
    }
  ];

  const handleNavClick = (href: string) => {
    setIsNavOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            Tygrus
          </Link>

          <button
            className="nav-toggle"
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
      
      <button 
        className={`scroll-top-button ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </>
  );
};

export default Navbar;