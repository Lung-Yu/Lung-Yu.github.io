import React from 'react';

const projectData = [
  {
    title: '作品一',
    image: '/src/assets/images/default-images.jpg',
    description: '這是一個使用 React 和 Vite 開發的範例項目。',
  },
  {
    title: '作品二',
    image: '/src/assets/images/default-images.jpg',
    description: '這是一個使用 TypeScript 和 CSS 開發的範例項目。',
  },
];

const Projects = ({ openModal }: { openModal: (image: string) => void }) => (
  <section className="projects">
    <h2>我的作品</h2>
    {projectData.map((project, index) => (
      <div className="project" key={index}>
        <h3>{project.title}</h3>
        <img src={project.image} alt={project.title} onClick={() => openModal(project.image)} />
        <p>{project.description}</p>
      </div>
    ))}
  </section>
);

export default Projects;