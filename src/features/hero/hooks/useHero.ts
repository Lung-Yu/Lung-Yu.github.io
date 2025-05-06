import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { HeroContent } from '../types';

export const useHero = () => {
  const { i18n } = useTranslation();
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadHeroData = async () => {
      setLoading(true);
      try {
        const lang = i18n.language || 'en';
        const module = await import(`../data/${lang}.json`);
        setHeroContent(module.hero);
      } catch (error) {
        console.error('Error loading hero data:', error);
        // 如果特定語言資料載入失敗，嘗試載入英文資料作為後備
        try {
          const fallbackData = await import(`../data/en.json`);
          setHeroContent(fallbackData.hero);
        } catch (fallbackError) {
          console.error('Error loading fallback hero data:', fallbackError);
          // 如果都失敗，設置空資料結構
          setHeroContent({
            greeting: '',
            name: '',
            role: '',
            description: '',
            profileImage: '',
            socialLinks: {
              github: '',
              linkedin: '',
              email: ''
            },
            cta: {
              portfolio: 'View Portfolio',
              contact: 'Contact Me'
            }
          });
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadHeroData();
  }, [i18n.language]);

  return { 
    heroContent: heroContent || {
      greeting: '',
      name: '',
      role: '',
      description: '',
      profileImage: '',
      socialLinks: {
        github: '',
        linkedin: '',
        email: ''
      },
      cta: {
        portfolio: 'View Portfolio',
        contact: 'Contact Me'
      }
    },
    loading
  };
};