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
        <div 
            className="modal" 
            onClick={onClose} 
            role="dialog" 
            aria-labelledby="certificate-modal-title"
            aria-modal="true"
        >
            <div className="modal-content" onClick={handleModalClick}>
                <span 
                    className="close" 
                    onClick={onClose} 
                    aria-label={t('actions.close', 'Close')}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                <div className="modal-header">
                    <h2 id="certificate-modal-title">
                        {certificate.title}
                    </h2>
                    <p className="certificate-institution">{certificate.institution}</p>
                </div>
                <div className="modal-body">
                    <div className="modal-image-container">
                        <img 
                            src={certificate.image} 
                            alt={certificate.title} 
                            className="modal-image" 
                        />
                    </div>
                    <div className="modal-details">
                        <div className="description">
                            <p>{certificate.description}</p>
                        </div>
                        <div className="certificate-meta">
                            <p>
                                <strong>{t('fullName')}:</strong> {certificate.fullName}
                            </p>
                            <p>
                                <strong>{t('abbreviation')}:</strong> {certificate.abbreviation}
                            </p>
                            <p>
                                <strong>{t('category')}:</strong> {certificate.category}
                            </p>
                        </div>
                        <div className="certificate-dates">
                            <p>
                                <strong>{t('obtainedAt')}:</strong> {new Date(certificate.obtainedAt).toLocaleDateString()}
                            </p>
                            {certificate.expiryDate && certificate.expiryDate !== "-" && (
                                <p>
                                    <strong>{t('expiryDate')}:</strong> {new Date(certificate.expiryDate).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                        <p>
                            <strong>{t('obtainedAt')}:</strong> {certificate.obtainedAt}
                        </p>
                        {certificate.expiryDate && certificate.expiryDate !== "-" && (
                            <p>
                                <strong>{t('expiryDate')}:</strong> {certificate.expiryDate}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;