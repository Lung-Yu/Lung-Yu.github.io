import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/images/vite.svg'

const Header = () => (
  <header>
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
    <h1>我的個人作品集</h1>
  </header>
)

export default Header