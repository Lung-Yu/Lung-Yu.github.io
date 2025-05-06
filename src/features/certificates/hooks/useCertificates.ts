import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Certificate } from '../types';

// Generate a slug from certificate title and abbreviation for use as i18n key
const generateCertificateId = (cert: any): string => {
  const base = cert.abbreviation || cert.title;
  return base.toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export const useCertificates = () => {
  const { t, i18n } = useTranslation(['certificates', 'certificatesData']);
  
  const certificates = useMemo(() => {
    // Use the certificatesData namespace from i18n resources
    const certificatesData = t('certificatesData:certificates', { returnObjects: true }) as any[];
    
    if (!certificatesData || !Array.isArray(certificatesData)) {
      console.error('Failed to load certificates data from i18n');
      return [];
    }
    
    // Add an id property to each certificate if it doesn't already have one
    const data: Certificate[] = certificatesData.map((cert: any) => ({
      ...cert,
      id: cert.id || generateCertificateId(cert)
    }));
    
    return data.sort((a, b) => {
      if (b.value === a.value) {
        return new Date(b.obtainedAt).getTime() - new Date(a.obtainedAt).getTime();
      }
      return b.value - a.value;
    });
  }, [t, i18n.language]); // Re-run when language or t function changes

  // Get unique categories from the certificates and sort them
  const categories = useMemo(() => {
    // Extract unique categories from certificates
    const uniqueCategories = [...new Set(certificates.map(cert => cert.category))];
    // Sort categories alphabetically for consistent display
    uniqueCategories.sort((a, b) => a.localeCompare(b));
    // Return categories with 'All' as the first option
    return ['All', ...uniqueCategories];
  }, [certificates]);

  return {
    certificates,
    categories
  };
};