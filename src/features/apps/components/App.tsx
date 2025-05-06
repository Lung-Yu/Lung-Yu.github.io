import { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import '../styles/App.css';
import { CertificateList } from '../../certificates';
import { ProjectList, ProjectDetail } from '../../projects';
import { ConsultingList, ConsultingDetail } from '../../consultant';
import { NavigationBar } from '../../navigation';
import { Hero } from '../../hero';
import { CV } from '../../cv';
import { Skills } from '../../skills';
import { Modal } from '../../../shared/components/modal';

const scrollToSection = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    // 計算導航欄高度偏移量
    const navbarHeight = 64; // 根據需要調整
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Import components
import SectionIndicator from './SectionIndicator';
import AnimatedSection from './AnimatedSection';

// 主頁面組件
const HomePage = () => {
  const { hash } = useLocation();
  const sections = ['home', 'skills', 'projects', 'consulting', 'certificates'];

  useEffect(() => {
    if (hash) {
      // 移除 # 符號
      const sectionId = hash.replace('#', '');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="home-page">
      {/* Section Indicator for navigation */}
      <SectionIndicator sections={sections} />
      
      <AnimatedSection id="home" className="section home-section scroll-mt-16" threshold={0.1}>
        <Hero />
      </AnimatedSection>
      
      <AnimatedSection id="skills" className="section skills-section scroll-mt-16" threshold={0.2} delay={100}>
        <div className="section-divider"></div>
        <Skills />
      </AnimatedSection>
      
      <AnimatedSection id="projects" className="section projects-section scroll-mt-16" threshold={0.2} delay={200}>
        <div className="section-divider"></div>
        <ProjectList />
      </AnimatedSection>
      
      <AnimatedSection id="consulting" className="section consulting-section scroll-mt-16" threshold={0.2} delay={300}>
        <div className="section-divider"></div>
        <ConsultingList />
      </AnimatedSection>
      
      <AnimatedSection id="certificates" className="section certificates-section scroll-mt-16" threshold={0.2} delay={400}>
        <div className="section-divider"></div>
        <CertificateList />
      </AnimatedSection>
    </div>
  );
};

// Import components
import ScrollProgressBar from './ScrollProgressBar';
import BackToTopButton from './BackToTopButton';
import ScrollAnimation from './ScrollAnimation';

function App() {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Add scroll progress bar */}
        <ScrollProgressBar />
        <Routes>
          <Route path="/" element={<NavigationBar />} />
          <Route path="/project/*" element={<NavigationBar />} />
          <Route path="/consulting/*" element={<NavigationBar />} />
          {/* <Route path="/cv" element={<NavigationBar />} /> */}
        </Routes>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/project/:projectPath" element={<ProjectDetail />} />
            <Route path="/consulting/:consultingPath" element={<ConsultingDetail />} />
          </Routes>
        </main>
        <Modal
          isOpen={!!modalImage}
          onClose={closeModal}
        >
          {modalImage && (
            <img src={modalImage} alt="預覽圖片" className="modal-image" />
          )}
        </Modal>
        
        {/* Back to Top Button */}
        <BackToTopButton />
        
        {/* Add scroll-based animations to section headers */}
        <ScrollAnimation selector=".section-header" />
      </div>
    </Router>
  );
}

export default App;