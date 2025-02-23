import '../styles/AboutMe.css';
import profileImage from '../assets/images/default-images.jpg'; // 添加個人專業形象的照片

const AboutMe = () => (
  <section className="about-me">
    <div className="about-me-header">
      <img src={profileImage} alt="個人照片" className="profile-image" />
      <h2>關於我</h2>
    </div>
    <p>你好，我是 [你的名字]，一名資安顧問和前端開發者，擅長使用 React 和 TypeScript。</p>
    <h3>專業技能</h3>
    <ul>
      <li>資安分析與風險評估</li>
      <li>滲透測試與漏洞修補</li>
      <li>前端開發 (React, TypeScript, JavaScript, HTML, CSS)</li>
      <li>後端開發 (Node.js, Express)</li>
    </ul>
    <h3>經歷</h3>
    <ul>
      <li>資安顧問 - [公司名稱] (20XX - 現在)</li>
      <li>前端開發者 - [公司名稱] (20XX - 20XX)</li>
      <li>資安分析師 - [公司名稱] (20XX - 20XX)</li>
    </ul>
  </section>
);

export default AboutMe;