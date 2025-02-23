// src/components/Projects.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "React + Vite 開發項目",
    description: "使用現代化前端技術棧開發的範例專案，展示了最佳實踐和效能優化技術。",
    image: "/src/assets/images/projects/default.jpg",
    tags: ["React", "Vite", "TypeScript"],
    github: "https://github.com/your-username/project1",
    demo: "https://demo-link-1.com"
  },
  {
    id: 2,
    title: "TypeScript + CSS 專案",
    description: "展示TypeScript與現代CSS技術的範例項目，包含響應式設計與動畫效果。",
    image: "/src/assets/images/projects/default.jpg",
    tags: ["TypeScript", "CSS", "Web Development"],
    github: "https://github.com/your-username/project2",
    demo: "https://demo-link-2.com"
  }
];

const Projects = () => {
  return (
    <section className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2>作品集</h2>
          <p>展示我的最新項目和工作成果，每個專案都反映了我對技術的熱情和追求完美的態度。</p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;