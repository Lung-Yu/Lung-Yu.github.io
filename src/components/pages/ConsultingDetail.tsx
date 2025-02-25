import { useParams } from 'react-router-dom';
import { consultingProjects } from '../../data/consultingData';
import '../../styles/ConsultingDetail.css';

const ConsultingDetail = () => {
  const { consultingPath } = useParams();
  const project = consultingProjects.find(p => p.detailPath === consultingPath);

  if (!project) {
    return <div className="consulting-detail-error">找不到此顧問服務案例</div>;
  }

  return (
    <div className="consulting-detail">
      <div className="consulting-detail-container">
        <h1>{project.title}</h1>
        
        <div className="consulting-detail-content">
          <div className="consulting-detail-main">
            <img 
              src={project.image} 
              alt={project.title} 
              className="consulting-detail-image"
            />
            <p className="consulting-detail-description">{project.description}</p>
          </div>

          <div className="consulting-detail-info">
            <div className="consulting-detail-section">
              <h2>服務項目</h2>
              <ul>
                {project.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>

            {project.results && (
              <div className="consulting-detail-section">
                <h2>專案成果</h2>
                <ul>
                  {project.results.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.gallery && (
              <div className="consulting-detail-gallery">
                <h2>專案相關圖片</h2>
                <div className="gallery-grid">
                  {project.gallery.map((image, index) => (
                    <img 
                      key={index} 
                      src={image} 
                      alt={`${project.title} 圖片 ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultingDetail;