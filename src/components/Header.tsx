import { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <h1>我的個人作品集</h1>
        <button className="nav-toggle" onClick={toggleNav}>
          &#9776;
        </button>
        <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li><a href="#about-me" onClick={toggleNav}>關於我</a></li>
            <li><a href="#projects" onClick={toggleNav}>我的作品</a></li>
            <li><a href="#certificates" onClick={toggleNav}>我的證照</a></li>
            <li><a href="#contact" onClick={toggleNav}>聯絡我</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;