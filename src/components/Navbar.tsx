import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <h1>我的個人作品集</h1>
        <button className="nav-toggle" onClick={toggleNav}>
          {isNavOpen ? '✕' : '☰'}
        </button>
        <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {['關於我', '作品集', '證照資歷', '聯絡我'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={closeNav}
                  className={isScrolled ? 'scrolled' : ''}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;