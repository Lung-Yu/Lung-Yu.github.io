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

// Convert any category string to a standardized i18n key
const getCategoryKey = (category: string): string => {
  // Handle special case for "All"
  if (category === 'All' || category === '全部') return 'all';
  
  // Convert to lowercase kebab-case
  return category.toLowerCase().replace(/ /g, '-');
};

// Map categories between languages
const categoryMappings: Record<string, string> = {
  // English to i18n keys
  'Cyber Security': 'cyber-security',
  'Development': 'development', 
  'Infrastructure': 'infrastructure',
  'Data Science': 'data-science',
  'Hardware': 'hardware',
  
  // Chinese to i18n keys
  '網路安全': 'cyber-security',
  '開發': 'development',
  '基礎設施': 'infrastructure',
  '資料科學': 'data-science',
  '嵌入式': 'hardware'
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
      id: cert.id || generateCertificateId(cert),
      // Store the original category and its standardized key
      categoryKey: categoryMappings[cert.category] || getCategoryKey(cert.category)
    }));
    
    return data.sort((a, b) => {
      if (b.value === a.value) {
        return new Date(b.obtainedAt).getTime() - new Date(a.obtainedAt).getTime();
      }
      return b.value - a.value;
    });
  }, [t, i18n.language]); // Re-run when language or t function changes

  // Get unique categories from the certificates and create a mapping to i18n keys
  const { categories, categoryToKeyMap } = useMemo(() => {
    // Extract unique categories from certificates
    const uniqueCategories = [...new Set(certificates.map(cert => cert.category))];
    // Sort categories alphabetically for consistent display
    uniqueCategories.sort((a, b) => a.localeCompare(b));

    // Create mapping between category values in data and their i18n keys
    const categoryMap = new Map<string, string>();
    uniqueCategories.forEach(category => {
      // Use our predefined mappings or generate a key
      const key = categoryMappings[category] || getCategoryKey(category);
      categoryMap.set(category, key);
    });
    
    // Return categories with 'All' as the first option
    return {
      categories: ['All', ...uniqueCategories],
      categoryToKeyMap: categoryMap
    };
  }, [certificates]);

  return {
    certificates,
    categories,
    categoryToKeyMap
  };
};