import { useEffect, useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  id: string;
  className?: string;
  threshold?: number;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  id,
  className = '',
  threshold = 0.2,
  delay = 0
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('in-view');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before the element enters the viewport
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, delay]);
  
  return (
    <section 
      ref={sectionRef} 
      id={id} 
      className={`animated-section ${className}`}
    >
      <div className="section-connector"></div>
      <div className="section-spacing-top"></div> {/* 增加頂部間距 */}
      {children}
      <div className="section-spacing-bottom"></div> {/* 增加底部間距 */}
    </section>
  );
};

export default AnimatedSection;
