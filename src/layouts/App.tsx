import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from '../components/modal/Modal';
// import Hero from '../components/layout/Hero';
// import CV from '../components/pages/CV';
import './../styles/App.css';
import { CertificateList } from '../features/certificates';
import { ProjectList, ProjectDetail } from '../features/projects';
import { ConsultingList, ConsultingDetail } from '../features/consultant';
import { Navbar } from '../features/navigation'; 
import { Hero } from '../features/hero';
import { CV } from '../features/cv';

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
                <ProjectList />
              </div>
              <div id="consulting">
                <ConsultingList />
              </div>
              <div id="certificates">
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