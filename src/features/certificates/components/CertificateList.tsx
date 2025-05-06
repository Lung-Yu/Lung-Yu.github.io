import { useState } from 'react';
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
  const { certificates, categories } = useCertificates();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // If selected category is 'All', show all certificates
  // Otherwise filter by matching the selected category
  const filteredCertificates = selectedCategory === 'All'
    ? certificates
    : certificates.filter(cert => cert.category === selectedCategory);

  return (
    <section className="certificates">
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      <div className="categories">
        {categories.map((category, index) => {
          // Convert category to a format usable in i18n keys
          const categoryKey = category.toLowerCase().replace(/ /g, '-');
          
          // Get the display text for this category based on i18n
          let displayText;
          if (category === 'All') {
            displayText = t('categories.all', 'All');
          } else {
            // Try to translate using the kebab-case version of the category
            displayText = t(`categories.${categoryKey}`, { defaultValue: category });
          }
          
          return (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'active' : ''}
              aria-label={`Filter by ${displayText}`}
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