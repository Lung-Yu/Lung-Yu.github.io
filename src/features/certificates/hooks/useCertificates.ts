import { useState, useEffect, useMemo } from 'react';
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

export const useCertificates = () => {
  const { i18n } = useTranslation('certificates');
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCertificates = async () => {
      setLoading(true);
      try {
        // 根據當前語言動態載入資料
        let lang = i18n.language || 'en';
        // 如果是zh-TW或其他zh開頭，統一使用zh-TW
        if (lang.startsWith('zh')) {
          lang = 'zh-TW';
        } else {
          lang = 'en'; // 其他語言預設使用英文
        }
        
        console.log(`Loading certificates data from language: ${lang}`);
        
        const data = await import(`../data/${lang}.json`);
      
        if (!data || !data.certificates || !Array.isArray(data.certificates)) {
          throw new Error(`Certificates data in ${lang}.json is not properly formatted or empty`);
        }
        
        // Add categoryKey to each certificate
        const processedCertificates: Certificate[] = data.certificates.map((cert: any) => ({
          ...cert,
          id: cert.id || generateCertificateId(cert),
          categoryKey: getCategoryKey(cert.category)
        }));
        
        // Sort certificates by value and then by date
        const sortedCertificates = processedCertificates.sort((a, b) => {
          if (b.value === a.value) {
            return new Date(b.obtainedAt).getTime() - new Date(a.obtainedAt).getTime();
          }
          return b.value - a.value;
        });
        
        setCertificates(sortedCertificates);
        
        // Set category mappings
        if (data.categories) {
          setCategoryMap(data.categories);
        }
      } catch (error) {
        console.error('Error loading certificates:', error);
        // 如果特定語言資料載入失敗，嘗試載入英文資料作為後備
        try {
          const fallbackData = await import('../data/en.json');
          
          if (!fallbackData || !fallbackData.certificates) {
            throw new Error('Fallback data could not be loaded');
          }
          
          const processedCertificates = fallbackData.certificates.map((cert: any) => ({
            ...cert,
            id: cert.id || generateCertificateId(cert),
            categoryKey: getCategoryKey(cert.category)
          }));
          
          setCertificates(processedCertificates.sort((a: Certificate, b: Certificate) => {
            if (b.value === a.value) {
              return new Date(b.obtainedAt).getTime() - new Date(a.obtainedAt).getTime();
            }
            return b.value - a.value;
          }));
          
          if (fallbackData.categories) {
            setCategoryMap(fallbackData.categories);
          }
        } catch (fallbackError) {
          console.error('Failed to load fallback data:', fallbackError);
          setCertificates([]);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadCertificates();
  }, [i18n.language]); // 當語言變更時重新載入資料

  // Get unique categories from the certificates and create a mapping to i18n keys
  const { categories, categoryToKeyMap } = useMemo(() => {
    // Extract unique categories from certificates
    const uniqueCategories = [...new Set(certificates.map(cert => cert.category))];
    // Sort categories alphabetically for consistent display
    uniqueCategories.sort((a, b) => a.localeCompare(b));

    // Create mapping between category values in data and their i18n keys
    const categoryMap = new Map<string, string>();
    uniqueCategories.forEach(category => {
      // Use the category key from each certificate
      const key = getCategoryKey(category);
      categoryMap.set(category, key);
    });
    
    // Get the localized "All" option
    const allCategory = i18n.language.startsWith('zh') ? '全部' : 'All';
    
    // Return categories with 'All' as the first option
    return {
      categories: [allCategory, ...uniqueCategories],
      categoryToKeyMap: categoryMap
    };
  }, [certificates, i18n.language]);

  return {
    certificates,
    categories,
    categoryToKeyMap,
    categoryMap,
    loading
  };
};