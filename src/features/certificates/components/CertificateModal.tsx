import React from 'react';
import { Certificate } from '../types';
import '../styles/CertificateModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

interface CertificateModalProps {
    certificate: Certificate | null;
    onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
    const { t } = useTranslation('certificates');

    if (!certificate) return null;

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={handleModalClick}>
                <span className="close" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                <div className="modal-header">
                    <h2>{certificate.title}</h2>
                </div>
                <div className="modal-body">
                    <div className="modal-image-container">
                        <img src={certificate.image} alt={certificate.title} className="modal-image" />
                    </div>
                    <div className="modal-details">
                        <p>{certificate.description}</p>
                        <p><strong>{t('institution')}:</strong> {certificate.institution}</p>
                        <p><strong>{t('fullName')}:</strong> {certificate.fullName}</p>
                        <p><strong>{t('abbreviation')}:</strong> {certificate.abbreviation}</p>
                        <p><strong>{t('obtainedAt')}:</strong> {certificate.obtainedAt}</p>
                        {certificate.expiryDate && <p><strong>{t('expiryDate')}:</strong> {certificate.expiryDate}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;