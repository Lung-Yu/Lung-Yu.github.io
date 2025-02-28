import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faInfoCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../types';
import '../styles/Projects.css';
import { useTranslation } from 'react-i18next';

const ProjectList: React.FC = () => {
  const { t } = useTranslation(['projects', 'projectsData']);
  const [showAll, setShowAll] = useState(false);
  const { projects } = useProjects();
  const initialDisplayCount = 6;
  const displayedProjects = showAll ? projects : projects.slice(0, initialDisplayCount);

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>

        <div className="projects-grid">
          {displayedProjects.map((project: Project) => (
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
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link"
                        title={t('actions.viewGithub')}
                      >
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                    )}
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link"
                        title={t('actions.viewDemo')}
                      >
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
              {showAll ? t('projectCard.showLess') : t('projectCard.showMore')}
              <FontAwesomeIcon icon={showAll ? faChevronUp : faChevronDown} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectList;