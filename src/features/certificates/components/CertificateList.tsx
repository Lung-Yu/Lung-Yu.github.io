import { useState } from 'react';
import { useCertificates } from '../hooks/useCertificates';
import { Certificate } from '../types';
import CertificateModal from './CertificateModal';
import '../styles/Certificates.css';

const CertificateList = () => {
  const { certificates, categories } = useCertificates();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const filteredCertificates = selectedCategory === 'All'
    ? certificates
    : certificates.filter(cert => cert.category === selectedCategory);

  return (
    <section className="certificates">
      <h2>我的證照</h2>
      <div className="categories">
        {categories.map((category, index) => (
          <button key={index} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className="gallery">
        {filteredCertificates.map((certificate, index) => (
          <div className="certificate" key={index} onClick={() => setSelectedCertificate(certificate)}>
            <img src={certificate.image} alt={certificate.title} className="certificate-image" />
            <div className="certificate-info">
              <h3>{certificate.title}</h3>
              <p>{certificate.description}</p>
            </div>
          </div>
        ))}
      </div>
      <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />
    </section>
  );
};

export default CertificateList;