import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useConsulting } from '../hooks/useConsulting';
import { useTranslation } from 'react-i18next';
import '../styles/ConsultingList.css';

const ConsultingList = () => {
  const { t } = useTranslation('consultant');
  const { consulting } = useConsulting();
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 3;
  const displayedProjects = showAll ? consulting : consulting.slice(0, initialDisplayCount);

  return (
    <section className="consulting">
      <div className="consulting-container">
        <div className="consulting-header">
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>

        <div className="consulting-grid">
          {displayedProjects.map((project) => (
            <div key={project.id} className="consulting-card">
              <img
                src={project.image}
                alt={project.title}
                className="consulting-image"
              />
              <div className="consulting-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="consulting-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="consulting-tag">{tag}</span>
                  ))}
                </div>
                <Link to={`/consulting/${project.detailPath}`} className="consulting-link">
                  {t('actions.learnMore')}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {consulting.length > initialDisplayCount && (
          <div className="show-more-container">
            <button
              className="show-more-button"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? t('actions.showLess') : t('actions.showMore')}
              <FontAwesomeIcon icon={showAll ? faChevronUp : faChevronDown} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConsultingList;