import { useState } from 'react'
import Header from './components/Header'
import AboutMe from './components/AboutMe'
import Projects from './components/Projects'
import Modal from './components/Modal'
import './styles/App.css'

function App() {
  const [modalImage, setModalImage] = useState<string | null>(null)

  const openModal = (image: string) => {
    setModalImage(image)
  }

  const closeModal = () => {
    setModalImage(null)
  }

  return (
    <>
      <Header />
      <main>
        <AboutMe />
        <Projects openModal={openModal} />
      </main>
      <footer>
        <p>聯絡我：<a href="mailto:your-email@example.com">your-email@example.com</a></p>
      </footer>
      <Modal modalImage={modalImage} closeModal={closeModal} />
    </>
  )
}

export default App