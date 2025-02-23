import certificateData, { Certificate } from '../data/certificateData';
import '../styles/Certificates.css';
import { useState } from 'react';
import CertificateModal from './modal/certificate/CertificateModal';

const Certificates = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

    const categories = ['All', ...new Set(certificateData.map((certificate: Certificate) => certificate.category))];

    const filteredCertificates = selectedCategory === 'All'
        ? certificateData
        : certificateData.filter((certificate: Certificate) => certificate.category === selectedCategory);

    const openModal = (certificate: Certificate) => {
        setSelectedCertificate(certificate);
    };

    const closeModal = () => {
        setSelectedCertificate(null);
    };

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
                {filteredCertificates.map((certificate: Certificate, index: number) => (
                    <div className="certificate" key={index} onClick={() => openModal(certificate)}>
                        <img src={certificate.image} alt={certificate.title} className="certificate-image" />
                        <div className="certificate-info">
                            <h3>{certificate.title}</h3>
                            <p>{certificate.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <CertificateModal certificate={selectedCertificate} onClose={closeModal} />
        </section>
    );
};

export default Certificates;