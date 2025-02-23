import projectData from '../data/projectData';
import '../styles/Projects.css';

const Projects = ({ openModal }: { openModal: (image: string) => void }) => (
  <section className="projects">
    <div className="projects-header">
      <h2>我的作品</h2>
      <img src="/src/assets/images/large-background.jpg" alt="背景圖片" className="projects-background" />
    </div>
    <div className="gallery">
      {projectData.map((project, index) => (
        <div className="project" key={index}>
          <h3>{project.title}</h3>
          <img src={project.image} alt={project.title} onClick={() => openModal(project.image)} />
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;