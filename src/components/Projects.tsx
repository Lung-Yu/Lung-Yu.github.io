import projectData from '../data/projectData';
import '../styles/Projects.css';
import { useState } from 'react';
import Modal from './modal/Modal';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedProject(image);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section className="projects">
      <h2>我的作品</h2>
      <div className="gallery">
        {projectData.map((project, index) => (
          <div className="project" key={index} onClick={() => openModal(project.image)}>
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedProject && <Modal modalImage={selectedProject} closeModal={closeModal} />}
    </section>
  );
};

export default Projects;