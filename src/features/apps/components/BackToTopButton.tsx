import { useEffect, useState } from 'react';
import { useAppData } from '../hooks/useAppData';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { appData } = useAppData();
  const backToTopText = appData?.app?.navigation?.backToTop || "Back to Top";

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Clean up
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label={backToTopText}
      title={backToTopText}
    >
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M8 3L14 9L12.59 10.41L9 6.83V13H7V6.83L3.41 10.41L2 9L8 3Z" 
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default BackToTopButton;
