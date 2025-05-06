import { useMemo } from 'react';
import certificatesJson from '../data/certificates.json';
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
  
  const certificates = useMemo(() => {
    // Add an id property to each certificate if it doesn't already have one
    const data: Certificate[] = (certificatesJson.certificates).map((cert: any) => ({
      ...cert,
      id: cert.id || generateCertificateId(cert)
    }));
    
    return data.sort((a, b) => {
      if (b.value === a.value) {
        return new Date(b.obtainedAt).getTime() - new Date(a.obtainedAt).getTime();
      }
      return b.value - a.value;
    });
  }, []);

  const categories = useMemo(() => {
    return ['All', ...new Set(certificates.map(cert => cert.category))];
  }, [certificates]);

  return {
    certificates,
    categories
  };
};