import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { Modal } from '../../../shared/components/modal';
import '../styles/ProjectDetail.css';

const ProjectDetail = () => {
  const { projectPath } = useParams();
  const [modalImage, setModalImage] = useState<string | null>(null);
  const { projects } = useProjects();

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

          <div className="project-dates">
            <h2>專案時間</h2>
            <p>開始日期: {project.startDate}</p>
            <p>結束日期: {project.endDate || '進行中'}</p>
          </div>

          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                GitHub 原始碼
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                線上展示
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