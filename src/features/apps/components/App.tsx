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
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// 主頁面組件
const HomePage = () => {
  const { hash } = useLocation();

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
      <Hero />
      <section id="skills" className="section-padding scroll-mt-20">
        <Skills />
      </section>
      <section id="projects" className="section-padding scroll-mt-20">
        <ProjectList />
      </section>
      <section id="consulting" className="section-padding scroll-mt-20">
        <ConsultingList />
      </section>
      <section id="certificates" className="section-padding scroll-mt-20">
        <CertificateList />
      </section>
    </div>
  );
};

function App() {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<NavigationBar />} />
          <Route path="/project/*" element={<NavigationBar />} />
          <Route path="/consulting/*" element={<NavigationBar />} />
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
      </div>
    </Router>
  );
}

export default App;