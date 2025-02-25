import { useParams } from 'react-router-dom';
import { projects } from '../../data/projectData';
import { useState } from 'react';
import Modal from '../modal/Modal';

const ProjectDetail = () => {
  const { projectPath } = useParams();
  const [modalImage, setModalImage] = useState<string | null>(null);
  
  const project = projects.find(p => p.detailPath === projectPath);

  if (!project) {
    return <div className="project-detail-error">專案不存在</div>;
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
          <p>{project.description}</p>
          
          <div className="project-detail-tags">
            {project.tags.map(tag => (
              <span key={tag} className="project-tag">{tag}</span>
            ))}
          </div>

          {project.gallery && (
            <div className="project-gallery">
              <h2>專案圖片</h2>
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

          {project.videos && (
            <div className="project-videos">
              <h2>相關影片</h2>
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
        </div>
      </div>
      {modalImage && <Modal modalImage={modalImage} closeModal={closeModal} />}
    </div>
  );
};

export default ProjectDetail;