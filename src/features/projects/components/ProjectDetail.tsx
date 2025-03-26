import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { Modal } from '../../../shared/components/modal';
import { useTranslation } from 'react-i18next';
import '../styles/ProjectDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ProjectDetail = () => {
  const { projectPath } = useParams();
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [currentDemoStep, setCurrentDemoStep] = useState(0);
  const { t } = useTranslation(['projects', 'projectsData']);

  const { projects } = useProjects();

  const project = projects.find(p => p.detailPath === projectPath);

  if (!project) {
    return <div className="project-detail-error">{t('projects:projectNotFound')}</div>;
  }

  const openModal = (image: string) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="project-detail">
      <div className="project-detail-container">
        <h1>{project.title}</h1>
        
        <div className="project-detail-content">
          <div className="project-overview">
            <p className="project-description">{project.description}</p>
            <div className="project-detail-tags">
              {project.tags.map(tag => (
                <span key={tag} className="project-tag">
                  {t(`projectsData:tags.${tag}`, { defaultValue: tag })}
                </span>
              ))}
            </div>
          </div>

          {project.highlights && (
            <div className="project-highlights">
              <h2>{t('projects:highlights')}</h2>
              <div className="highlights-grid">
                {project.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-card">
                    <div className="highlight-icon">
                      <i className={`icon-${highlight.icon}`}></i>
                    </div>
                    <h3>{t(`projects:details.${highlight.title}`, { defaultValue: highlight.title })}</h3>
                    <p>{t(`projects:details.${highlight.description}`, { defaultValue: highlight.description })}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.features && (
            <div className="project-features">
              <h2>{t('projects:features')}</h2>
              <ul>
                {project.features.map((feature, index) => (
                  <li key={index}>
                    {t(`projectsData:features.${feature}`, { defaultValue: feature })}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.installation && (
            <div className="project-installation">
              <h2>{t('projects:installation')}</h2>
              <ol>
                {project.installation.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {project.configuration && (
            <div className="project-configuration">
              <h2>{t('projects:configuration')}</h2>
              {Object.entries(project.configuration).map(([section, config]) => (
                <div key={section} className="config-section">
                  <h3>{t(section)}</h3>
                  <table>
                    <tbody>
                      {Object.entries(config).map(([key, value]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}

          {project.gallery && (
            <div className="project-gallery">
              <h2>{t('projects:sections.projectImages')}</h2>
              <div className="gallery-grid">
                {project.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} ${t('projects:sections.projectImages')} ${index + 1}`}
                    onClick={() => openModal(image)}
                  />
                ))}
              </div>
            </div>
          )}

          {project.demoSteps && project.demoSteps.length > 0 && (
            <div className="project-demo">
              <h2>{t('projects:demonstration')}</h2>
              <div className="demo-steps">
                <div className="demo-navigation">
                  {project.demoSteps.map((step, index) => (
                    <button
                      key={index}
                      className={`step-button ${index === currentDemoStep ? 'active' : ''}`}
                      onClick={() => setCurrentDemoStep(index)}
                    >
                      {t('projects:details.step', { number: index + 1 })}: 
                      {t(`projectsData:demoSteps.${step.title}`, { defaultValue: step.title })}
                    </button>
                  ))}
                </div>
                {project.demoSteps[currentDemoStep] && (
                  <div className="demo-content">
                    <img
                      src={project.demoSteps[currentDemoStep]?.image}
                      alt={t(`projects:details.${project.demoSteps[currentDemoStep]?.title}`, {
                        defaultValue: project.demoSteps[currentDemoStep]?.title || ''
                      })}
                      onClick={() => project.demoSteps?.[currentDemoStep]?.image && 
                        openModal(project.demoSteps[currentDemoStep].image)}
                    />
                    <p>{t(`projects:details.${project.demoSteps[currentDemoStep]?.description}`, {
                      defaultValue: project.demoSteps[currentDemoStep]?.description || ''
                    })}</p>
                  </div>
                )}
                <div className="demo-navigation-buttons">
                  {currentDemoStep > 0 && (
                    <button onClick={() => setCurrentDemoStep(prev => prev - 1)}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                      {t('projects:details.previous')}
                    </button>
                  )}
                  {project.demoSteps && currentDemoStep < project.demoSteps.length - 1 && (
                    <button onClick={() => setCurrentDemoStep(prev => prev + 1)}>
                      {t('projects:details.next')}
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {project.videos && (
            <div className="project-videos">
              <h2>{t('projects:projectVideos')}</h2>
              <div className="videos-grid">
                {project.videos.map((video, index) => (
                  <video
                    key={index}
                    src={video}
                    controls
                  />
                ))}
              </div>
            </div>
          )}

          <div className="project-dates">
            <h2>{t('projects:sections.projectDates')}</h2>
            <div className="date-info">
              <div className="date-row">
                <span className="date-label">{t('projects:sections.startDate')}:</span>
                <span className="date-value">{project.startDate}</span>
              </div>
              <div className="date-row">
                <span className="date-label">{t('projects:sections.endDate')}:</span>
                <span className="date-value">{project.endDate || t('projects:sections.ongoing')}</span>
              </div>
            </div>
          </div>

          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                {t('projects:actions.viewGithub')}
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                {t('projects:actions.viewDemo')}
              </a>
            )}
          </div>
        </div>
      </div>
      {modalImage && (
        <Modal
          isOpen={!!modalImage}
          onClose={closeModal}
        >
          {modalImage && (
            <img src={modalImage} alt="預覽圖片" className="modal-image" />
          )}
        </Modal>
      )}
    </div>
  );
};

export default ProjectDetail;