import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/images/vite.svg'
import '../styles/Header.css'

const Header = () => (
  <header className="header">
    <div className="container">
      <div className="logo-container">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>我的個人作品集</h1>
      <nav>
        <ul className="nav-list">
          <li><a href="#about-me">關於我</a></li>
          <li><a href="#projects">我的作品</a></li>
          <li><a href="#contact">聯絡我</a></li>
        </ul>
      </nav>
    </div>
  </header>
)

export default Header