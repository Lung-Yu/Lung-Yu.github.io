import '../styles/AboutMe.css';
import profileImage from '../assets/images/aboutme/profile.png'; // 添加個人專業形象的照片
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const AboutMe = () => (
  <section className="about-me">
    <div className="about-me-left">
      <img src={profileImage} alt="個人照片" className="profile-image" />
      <div className="contact-info">
        <a href="mailto:workfile975@gmail.com" className="contact-item">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a href="https://www.linkedin.com/in/lung-yu-tsai-633865100/" target="_blank" rel="noopener noreferrer" className="contact-item">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://github.com/Lung-Yu" target="_blank" rel="noopener noreferrer" className="contact-item">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
    <div className="about-me-right">
      <h2>蔡龍佑 (Tygrus)</h2>
      <div className="bio">
        <p>Tygrus 目前在果核數位服務，主要從事安全軟體開發的工作。過去累積了 IoT 應用、手機 App、網站系統及雲端服務等開發經驗，也接觸過影像/音訊識別與 AI 模型建立的專案。在資安領域中，曾參與資安評估、弱點檢測及風險評估等相關工作。</p>
        <p>擁有 CISSP、CSSLP、ISO 27001:2022、CEH、MCSD、SCWCD 和 RHCVA 等認證。曾於 iThome CyberSec 2023 與 DevOpsDays 2024 擔任講者。目前專注在安全軟體開發流程的實踐與改善。</p>
      </div>
    </div>
  </section>
);

export default AboutMe;