import React from 'react'

const Projects = ({ openModal }: { openModal: (image: string) => void }) => (
  <section className="projects">
    <h2>我的作品</h2>
    <div className="project">
      <h3>作品一</h3>
      <img src="/src/assets/images/image1.jpg" alt="作品一" onClick={() => openModal('/src/assets/images/image1.jpg')} />
      <p>這是一個使用 React 和 Vite 開發的範例項目。</p>
    </div>
    <div className="project">
      <h3>作品二</h3>
      <img src="/src/assets/images/image2.jpg" alt="作品二" onClick={() => openModal('/src/assets/images/image2.jpg')} />
      <p>這是一個使用 TypeScript 和 CSS 開發的範例項目。</p>
    </div>
  </section>
)

export default Projects
