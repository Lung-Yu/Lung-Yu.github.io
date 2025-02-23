import '../styles/AboutMe.css';
import profileImage from '../assets/images/default-images.jpg'; // 添加個人專業形象的照片
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const AboutMe = () => (
  <section className="about-me">
    <div className="about-me-header">
      <img src={profileImage} alt="個人照片" className="profile-image" />
      <div className="header-info">
        <h2>關於我</h2>
        <div className="contact-info">
          <div className="contact-item">
            <FontAwesomeIcon icon={faEnvelope} />
            <a href="mailto:xxx@example.com">xxx@example.com</a>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faPhone} />
            <span>+123 456 7890</span>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faLinkedin} />
            <a href="https://www.linkedin.com/in/xxx" target="_blank" rel="noopener noreferrer">linkedin.com/in/xxx</a>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faGithub} />
            <a href="https://github.com/xxx" target="_blank" rel="noopener noreferrer">github.com/xxx</a>
          </div>
        </div>
      </div>
    </div>
    <div className="bio">
      <p>Tygrus 目前在果核數位服務，主要從事安全軟體開發的工作。過去累積了 IoT 應用、手機 App、網站系統及雲端服務等開發經驗，也接觸過影像/音訊識別與 AI 模型建立的專案。在資安領域中，曾參與資安評估、弱點檢測及風險評估等相關工作。</p>
      <p>擁有 CISSP、CSSLP、ISO 27001:2022、CEH、MCSD、SCWCD 和 RHCVA 等認證。曾於 iThome CyberSec 2023 與 DevOpsDays 2024 擔任講者。目前專注在安全軟體開發流程的實踐與改善。</p>
    </div>
  </section>
);

export default AboutMe;