import { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  selector: string; // CSS selector for elements to animate
}

/**
 * Component that adds scroll-triggered animations to elements
 * This affects elements already in the DOM based on the selector
 */
const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ selector }) => {
  const initialized = useRef(false);
  
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    const handleScroll = () => {
      const elements = document.querySelectorAll(selector);
      const windowHeight = window.innerHeight;
      
      elements.forEach((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        const elementVisible = 150; // How many pixels of the element need to be visible
        
        if (rect.top < windowHeight - elementVisible) {
          (el as HTMLElement).classList.add('active');
        } else {
          (el as HTMLElement).classList.remove('active');
        }
      });
    };
    
    // Initial check
    handleScroll();
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selector]);
  
  return null; // This component doesn't render anything directly
};

export default ScrollAnimation;
