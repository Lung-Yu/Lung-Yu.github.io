import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConsulting } from '../hooks/useConsulting';
import { Modal } from '../../../shared/components/modal';
import '../styles/ConsultingDetail.css';

const ConsultingDetail = () => {
  const { t } = useTranslation('consultant');
  const { consultingPath } = useParams();
  const [modalImage, setModalImage] = useState<string | null>(null);
  const { consulting } = useConsulting();
  
  const project = consulting.find(p => p.detailPath === consultingPath);

  if (!project) {
    return <div className="consulting-detail-error">{t('detail.notFound')}</div>;
  }

  const openModal = (image: string) => setModalImage(image);
  const closeModal = () => setModalImage(null);

  return (
    <div className="consulting-detail">
      <div className="consulting-detail-container">
        <h1>{project.title}</h1>
        
        <div className="consulting-detail-content">
          <div className="consulting-main-image">
            <img 
              src={project.image} 
              alt={project.title}
              onClick={() => openModal(project.image)}
            />
          </div>

          <div className="consulting-detail-info">
            <div className="consulting-description">
              <h2>{t('detail.projectOverview')}</h2>
              <p>{project.description}</p>
            </div>

            <div className="consulting-services">
              <h2>{t('detail.services')}</h2>
              <ul>
                {project.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>

            {project.results && (
              <div className="consulting-results">
                <h2>{t('detail.results')}</h2>
                <ul>
                  {project.results.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="consulting-tags">
              {project.tags.map(tag => (
                <span key={tag} className="consulting-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modalImage && <Modal modalImage={modalImage} closeModal={closeModal} />}
    </div>
  );
};

export default ConsultingDetail;