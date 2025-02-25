import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { consultingProjects } from '../../data/consultingData';
import '../../styles/Consulting.css';

const Consulting = () => {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 3;
  const displayedProjects = showAll ? consultingProjects : consultingProjects.slice(0, initialDisplayCount);

  return (
    <section className="consulting">
      <div className="consulting-container">
        <div className="consulting-header">
          <h2>顧問服務</h2>
          <p>提供專業的資訊安全顧問服務，協助企業建立完善的資安防護體系。</p>
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
                    <span key={tag} className="consulting-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to={`/consulting/${project.detailPath}`} className="consulting-link">
                  了解更多
                </Link>
              </div>
            </div>
          ))}
        </div>

        {consultingProjects.length > initialDisplayCount && (
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

export default Consulting;