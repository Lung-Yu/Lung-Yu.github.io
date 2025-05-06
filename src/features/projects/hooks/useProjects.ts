import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Project } from '../types';

export const useProjects = () => {
  const { i18n } = useTranslation('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        // Dynamically load data based on current language
        const lang = i18n.language || 'en';
        const data = await import(`../data/${lang}.json`);
        setProjects(data.projects as Project[]);
      } catch (error) {
        console.error('Error loading projects data:', error);
        // Fallback to English if specific language data fails to load
        try {
          const fallbackData = await import(`../data/en.json`);
          setProjects(fallbackData.projects as Project[]);
        } catch (fallbackError) {
          console.error('Error loading fallback projects data:', fallbackError);
          setProjects([]);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, [i18n.language]); // Reload when language changes

  // Sort projects by endDate, startDate in descending order
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const endDateComparison = new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      if (endDateComparison !== 0) {
        return endDateComparison;
      }
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
  }, [projects]);

  return { 
    projects: sortedProjects,
    loading 
  };
};