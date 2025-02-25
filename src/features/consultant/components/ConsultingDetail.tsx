import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useConsulting } from '../hooks/useConsulting';
import Modal from '../../../components/modal/Modal';
import '../styles/ConsultingDetail.css';

const ConsultingDetail = () => {
  const { consultingPath } = useParams();
  const [modalImage, setModalImage] = useState<string | null>(null);
  const { consulting } = useConsulting();
  
  const project = consulting.find(p => p.detailPath === consultingPath);

  if (!project) {
    return <div className="consulting-detail-error">專案不存在</div>;
  }

  const openModal = (image: string) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

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
              <h2>專案概述</h2>
              <p>{project.description}</p>
            </div>

            <div className="consulting-services">
              <h2>服務內容</h2>
              <ul>
                {project.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>

            {project.results && (
              <div className="consulting-results">
                <h2>專案成果</h2>
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

          {project.gallery && (
            <div className="consulting-gallery">
              <h2>專案相關圖片</h2>
              <div className="gallery-grid">
                {project.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} 圖片 ${index + 1}`}
                    onClick={() => openModal(image)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {modalImage && <Modal modalImage={modalImage} closeModal={closeModal} />}
    </div>
  );
};

export default ConsultingDetail;