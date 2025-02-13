import certificateData, { Certificate } from '../data/certificateData';
import '../styles/Certificates.css';

const Certificates = ({ openModal }: { openModal: (image: string) => void }) => (
    <section className="certificates">
        <h2>我的證照</h2>
        <div className="gallery">
            {certificateData.map((certificate: Certificate, index: number) => (
                <div className="certificate" key={index}>
                    <h3>{certificate.title}</h3>
                    <img src={certificate.image} alt={certificate.title} onClick={() => openModal(certificate.image)} />
                    <p>{certificate.description}</p>
                </div>
            ))}
        </div>
    </section>
);

export default Certificates;