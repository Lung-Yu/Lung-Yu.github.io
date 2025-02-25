import { useMemo } from 'react';
import certificatesJson from '../data/certificates.json';
import type { Certificate } from '../types';

export const useCertificates = () => {
  const certificates = useMemo(() => {
    const data: Certificate[] = certificatesJson.certificates;
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