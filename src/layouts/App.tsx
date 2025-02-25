import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Projects from '../components/layout/Projects';
import Certificates from '../components/layout/Certificates';
import Modal from '../components/modal/Modal';
import Hero from '../components/layout/Hero';
import CV from '../components/pages/CV';
import './../styles/App.css';
import ProjectDetail from '../components/pages/ProjectDetail';
import Consulting from '../components/layout/Consulting';
import ConsultingDetail from '../components/pages/ConsultingDetail';
import { CertificateList } from '../features/certificates';
import { ProjectList } from '../features/projects';


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
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <div className="home-page">
              <Hero />
              <div id="projects">
                {/* <Projects /> */}
                <ProjectList />
              </div>
              <div id="consulting"> {/* 新增顧問服務區塊 */}
                <Consulting />
              </div>
              <div id="certificates">
                {/* <Certificates /> */}
                <CertificateList />
              </div>
            </div>
          } />
          <Route path="/cv" element={<CV />} />
          <Route path="/project/:projectPath" element={<ProjectDetail />} />
          <Route path="/consulting/:consultingPath" element={<ConsultingDetail />} />
        </Routes>
      </main>
      <footer id="contact">
        <p>聯絡我：<a href="mailto:workfile975@gmail.com">workfile975@gmail.com</a></p>
      </footer>
      {modalImage && <Modal modalImage={modalImage} closeModal={closeModal} />}
    </Router>
  );
}

export default App;