import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { AppData } from '../types';

/**
 * Custom hook to load and manage app data based on the current language
 * Follows the pattern described in the multi-language implementation guidelines
 */
export const useAppData = () => {
  const { i18n } = useTranslation();
  const [appData, setAppData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAppData = async () => {
      setLoading(true);
      try {
        // Dynamically load data based on current language
        let lang = i18n.language || 'en';
        // If language starts with zh, use zh-TW
        if (lang.startsWith('zh')) {
          lang = 'zh-TW';
        } else {
          lang = 'en'; // Default to English for other languages
        }
        
        console.log(`Loading app data from language: ${lang}`);
        
        // Import language-specific data
        const data = await import(`../data/${lang}.json`);
        
        if (!data || !data.app) {
          throw new Error(`App data in ${lang}.json is not properly formatted or empty`);
        }
        
        setAppData(data as AppData);
      } catch (error) {
        console.error('Error loading app data:', error);
        // Fallback to English if specific language data fails to load
        try {
          console.log('Attempting to load fallback app data from en.json');
          const fallbackData = await import('../data/en.json');
          
          if (!fallbackData || !fallbackData.app) {
            throw new Error('Fallback app data could not be loaded');
          }
          
          setAppData(fallbackData as AppData);
          console.log('Successfully loaded fallback app data');
        } catch (fallbackError) {
          console.error('Failed to load fallback app data:', fallbackError);
          setAppData(null);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadAppData();
  }, [i18n.language]); // Reload when language changes

  return { appData, loading };
};
