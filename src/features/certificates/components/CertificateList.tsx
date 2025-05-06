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
  const { t } = useTranslation('certificates');
  const { certificates, categories } = useCertificates();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const filteredCertificates = selectedCategory === 'All'
    ? certificates
    : certificates.filter(cert => cert.category === selectedCategory);

  return (
    <section className="certificates">
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      <div className="categories">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {t(`categories.${category.toLowerCase().replace(' ', '-')}`)}
          </button>
        ))}
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