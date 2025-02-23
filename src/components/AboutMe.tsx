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
    <p>你好，我是 XXX，一名資安顧問和前端開發者，擅長使用 React 和 TypeScript。我熱衷於技術創新，並且在資安領域有豐富的經驗。</p>
    <h3>專業技能</h3>
    <ul>
      <li>資安分析與風險評估</li>
      <li>滲透測試與漏洞修補</li>
      <li>前端開發 (React, TypeScript, JavaScript, HTML, CSS)</li>
      <li>後端開發 (Node.js, Express)</li>
      <li>雲端服務 (AWS, Azure)</li>
      <li>資料庫管理 (MySQL, MongoDB)</li>
    </ul>
    <h3>經歷</h3>
    <div className="timeline">
      <div className="timeline-item">
        <div className="timeline-icon"></div>
        <div className="timeline-content">
          <h4>資安顧問 - XXX 公司</h4>
          <p>(20XX - 現在)</p>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-icon"></div>
        <div className="timeline-content">
          <h4>前端開發者 - XXX 公司</h4>
          <p>(20XX - 20XX)</p>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-icon"></div>
        <div className="timeline-content">
          <h4>資安分析師 - XXX 公司</h4>
          <p>(20XX - 20XX)</p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutMe;