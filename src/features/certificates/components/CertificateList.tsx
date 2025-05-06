import { useState, useMemo } from 'react';
import { useCertificates } from '../hooks/useCertificates';
import { Certificate } from '../types';
import CertificateModal from './CertificateModal';
import '../styles/Certificates.css';
import { useTranslation } from 'react-i18next';

const getImageUrl = (url: string) => {
  const timestamp = new Date().getTime();
  return `${url}?v=${timestamp}`;
};

const CertificateList = () => {
  const { t, i18n } = useTranslation('certificates');
  const { certificates, categories, categoryToKeyMap, loading } = useCertificates();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Filter certificates based on selected category
  const filteredCertificates = useMemo(() => {
    if (!certificates) return [];
    
    const allCategory = i18n.language.startsWith('zh') ? '全部' : 'All';
    
    if (selectedCategory === allCategory || selectedCategory === 'All') {
      return certificates;
    }
    return certificates.filter(cert => cert.category === selectedCategory);
  }, [certificates, selectedCategory, i18n.language]);

  return (
    <section className="certificates">
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      
      {loading ? (
        <div className="loading">{t('loading', 'Loading certificates...')}</div>
      ) : (
        <>
          <div className="categories">
            {categories.map((category, index) => {
              // Get the i18n key for this category
              const categoryKey = (category === 'All' || category === '全部') 
                ? 'all' 
                : categoryToKeyMap.get(category) || category.toLowerCase().replace(/ /g, '-');
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'active' : ''}
                  aria-label={`Filter by ${category}`}
                  data-category={category}
                  data-category-key={categoryKey}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <div className="gallery">
            {filteredCertificates.map((certificate, index) => (
              <div 
                className="certificate" 
                key={index} 
                onClick={() => setSelectedCertificate(certificate)}
                role="button"
                aria-label={`View details of ${certificate.title} certificate`}
              >
                <img 
                  src={getImageUrl(certificate.image)} 
                  alt={certificate.title}
                  className="certificate-image" 
                />
                <div className="certificate-info">
                  <h3>{certificate.title}</h3>
                  <p className="institution">{certificate.institution}</p>
                  <p className="short-description">
                    {certificate.description && certificate.description.length > 100 
                      ? certificate.description.substring(0, 100) + '...' 
                      : certificate.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />
        </>
      )}
    </section>
  );
};

export default CertificateList;