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

/**
 * CertificateModal component - displays detailed information about a selected certificate
 * Implements multi-language support according to feature-based architecture guidelines
 */
const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
    const { t } = useTranslation('certificates');

    if (!certificate) return null;

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    // Format dates according to the user's locale
    const formatDate = (dateString: string): string => {
        if (!dateString || dateString === '-' || dateString === '') {
            return t('noExpiryDate');
        }
        
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (error) {
            console.error("Invalid date format:", dateString);
            return dateString;
        }
    };

    // Try to get translated category from the i18n system
    const categoryKey = certificate.category.toLowerCase().replace(/ /g, '-');
    const translatedCategory = t(`categories.${categoryKey}`, certificate.category);

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
                    aria-label={t('actions.close')}
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
                                <strong>{t('category')}:</strong> {translatedCategory}
                            </p>
                        </div>
                        <div className="certificate-dates">
                            <p>
                                <strong>{t('obtainedAt')}:</strong> {formatDate(certificate.obtainedAt)}
                            </p>
                            {certificate.expiryDate && certificate.expiryDate !== "-" && (
                                <p>
                                    <strong>{t('expiryDate')}:</strong> {formatDate(certificate.expiryDate)}
                                </p>
                            )}
                            {(!certificate.expiryDate || certificate.expiryDate === "-") && (
                                <p>
                                    <strong>{t('expiryDate')}:</strong> {t('noExpiryDate')}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;