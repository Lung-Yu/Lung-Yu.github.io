import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
import '../styles/App.css';
import { CertificateList } from '../../certificates';
import { ProjectList, ProjectDetail } from '../../projects';
import { ConsultingList, ConsultingDetail } from '../../consultant';
import { NavigationBar } from '../../navigation';
import { Hero } from '../../hero';
import { CV } from '../../cv';
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

  const openModal = (image: string) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<NavigationBar />} />
        </Routes>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/project/:projectPath" element={<ProjectDetail />} />
            <Route path="/consulting/:consultingPath" element={<ConsultingDetail />} />
          </Routes>
        </main>
        <footer id="contact" className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-600">
                聯絡我：
                <a 
                  href="mailto:workfile975@gmail.com"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  workfile975@gmail.com
                </a>
              </p>
              <Routes>
                <Route path="/cv" element={
                  <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors">
                    返回網站
                  </Link>
                } />
              </Routes>
            </div>
          </div>
        </footer>
        {modalImage && <Modal modalImage={modalImage} closeModal={closeModal} />}
      </div>
    </Router>
  );
}

export default App;