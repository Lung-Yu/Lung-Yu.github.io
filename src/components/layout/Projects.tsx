import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faInfoCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Projects.css';
import { projects } from '../../data/projectData';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 6;
  const displayedProjects = showAll ? projects : projects.slice(0, initialDisplayCount);

  return (
    <section className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2>作品集</h2>
          <p>展示我的最新項目和工作成果，每個專案都反映了我對技術的熱情和追求完美的態度。</p>
        </div>

        <div className="projects-grid">
          {displayedProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                      </a>
                    )}
                    <Link to={`/project/${project.detailPath}`} className="project-link">
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </Link>
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

        {projects.length > initialDisplayCount && (
          <div className="show-more-container">
            <button
              className="show-more-button"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  <span>顯示較少</span>
                  <FontAwesomeIcon icon={faChevronUp} />
                </>
              ) : (
                <>
                  <span>顯示更多</span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;