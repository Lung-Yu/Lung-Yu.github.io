import { useEffect, useState } from 'react';

interface SectionIndicatorProps {
  sections: string[];
}

const SectionIndicator: React.FC<SectionIndicatorProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]);

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

  return (
    <div className="section-indicator" aria-hidden="true">
      {sections.map((section) => (
        <div
          key={section}
          className={`section-indicator-dot ${activeSection === section ? 'active' : ''}`}
          onClick={() => handleDotClick(section)}
          title={section.charAt(0).toUpperCase() + section.slice(1)}
        />
      ))}
    </div>
  );
};

export default SectionIndicator;
