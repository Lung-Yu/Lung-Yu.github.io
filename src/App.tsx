import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
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
      <main>
        <section className="about-me">
          <h2>關於我</h2>
          <p>你好，我是 [你的名字]，一名前端開發者，擅長使用 React 和 TypeScript。</p>
        </section>
        <section className="projects">
          <h2>我的作品</h2>
          <div className="project">
            <h3>作品一</h3>
            <p>這是一個使用 React 和 Vite 開發的範例項目。</p>
          </div>
          <div className="project">
            <h3>作品二</h3>
            <p>這是一個使用 TypeScript 和 CSS 開發的範例項目。</p>
          </div>
        </section>
      </main>
      <footer>
        <p>聯絡我：<a href="mailto:your-email@example.com">your-email@example.com</a></p>
      </footer>
    </>
  )
}

export default App