import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Modal from './components/modal/Modal';
import Hero from './components/Hero';
import CV from './components/pages/CV';
import './styles/App.css';

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
      <Hero />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <div id="about-me"> 
                <AboutMe />
              </div>
              <div id="projects"> 
                <Projects />
              </div>
              <div id="certificates"> 
                <Certificates />
              </div>
            </>
          } />
          <Route path="/cv" element={<CV />} />
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