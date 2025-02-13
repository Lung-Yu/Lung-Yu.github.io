import certificateData, { Certificate } from '../data/certificateData';
import '../styles/Certificates.css';
import { useState } from 'react';

const Certificates = ({ openModal }: { openModal: (image: string) => void }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', ...new Set(certificateData.map((certificate: Certificate) => certificate.category))];

    const filteredCertificates = selectedCategory === 'All'
        ? certificateData
        : certificateData.filter((certificate: Certificate) => certificate.category === selectedCategory);

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
                    <div className="certificate" key={index}>
                        <h3>{certificate.title}</h3>
                        <img src={certificate.image} alt={certificate.title} onClick={() => openModal(certificate.image)} />
                        <p>{certificate.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Certificates;