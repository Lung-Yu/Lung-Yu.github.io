import { useEffect, useState } from 'react';
import { useAppData } from '../hooks/useAppData';

interface SectionIndicatorProps {
  sections: string[];
}

const SectionIndicator: React.FC<SectionIndicatorProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]);
  const { appData } = useAppData();

  useEffect(() => {
    const handleScroll = () => {
      // Get current scroll position
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Find which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Call once on mount to set initial active section
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleDotClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const navbarHeight = 64; // Adjust based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Get section title from app data or fallback to capitalized section name
  const getSectionTitle = (section: string) => {
    // First try to get from app data
    if (appData?.app?.sections && appData.app.sections[section]) {
      return appData.app.sections[section];
    }
    
    // Fallback: capitalize first letter
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  return (
    <div className="section-indicator" aria-hidden="true">
      {sections.map((section) => (
        <div
          key={section}
          className={`section-indicator-dot ${activeSection === section ? 'active' : ''}`}
          onClick={() => handleDotClick(section)}
          title={getSectionTitle(section)}
        />
      ))}
    </div>
  );
};

export default SectionIndicator;
