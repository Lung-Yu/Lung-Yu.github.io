import React from 'react';
import { Certificate } from '../data/certificateData';
import '../styles/CertificateModal.css';

interface CertificateModalProps {
    certificate: Certificate | null;
    onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
    if (!certificate) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="modal-header">
                    <h2>{certificate.title}</h2>
                </div>
                <div className="modal-body">
                    <div className="modal-image-container">
                        <img src={certificate.image} alt={certificate.title} className="modal-image" />
                    </div>
                    <div className="modal-details">
                        <p>{certificate.description}</p>
                        <p><strong>Institution:</strong> {certificate.institution}</p>
                        <p><strong>Full Name:</strong> {certificate.fullName}</p>
                        <p><strong>Abbreviation:</strong> {certificate.abbreviation}</p>
                        <p><strong>Obtained At:</strong> {certificate.obtainedAt}</p>
                        {certificate.expiryDate && <p><strong>Expiry Date:</strong> {certificate.expiryDate}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;