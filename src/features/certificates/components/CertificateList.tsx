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
  const { certificates, categories, categoryToKeyMap } = useCertificates();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Filter certificates based on selected category
  const filteredCertificates = useMemo(() => {
    if (selectedCategory === 'All') {
      return certificates;
    }
    return certificates.filter(cert => cert.category === selectedCategory);
  }, [certificates, selectedCategory]);

  return (
    <section className="certificates">
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      <div className="categories">
        {categories.map((category, index) => {
          // Get the i18n key for this category
          const categoryKey = category === 'All' 
            ? 'all' 
            : categoryToKeyMap.get(category) || category.toLowerCase().replace(/ /g, '-');
          
          // Get the display text for this category based on i18n
          const displayText = category === 'All' 
            ? t('categories.all', 'All')
            : t(`categories.${categoryKey}`, { defaultValue: category });
          
          return (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'active' : ''}
              aria-label={`Filter by ${displayText}`}
              data-category={category}
              data-category-key={categoryKey}
            >
              {displayText}
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
            aria-label={t('viewCertificateDetails', 'View details of {{title}} certificate', {
              title: t(`certificates.${certificate.id}.title`, certificate.title)
            })}
          >
            <img 
              src={getImageUrl(certificate.image)} 
              alt={t(`certificates.${certificate.id}.title`, certificate.title)}
              className="certificate-image" 
            />
            <div className="certificate-info">
              <h3>{t(`certificates.${certificate.id}.title`, certificate.title)}</h3>
              <p>{t(`certificates.${certificate.id}.shortDescription`, certificate.description)}</p>
            </div>
          </div>
        ))}
      </div>
      <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />
    </section>
  );
};

export default CertificateList;