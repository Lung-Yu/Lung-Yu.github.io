import { useCV } from '../hooks/useCV';
import '../styles/CV.css';

const CV = () => {
  const { cvData } = useCV();

  return (
    <div className="cv-container">
      <header className="cv-header">
        <h1>{cvData.name}</h1>
        <div className="title">{cvData.title}</div>
        <p>{cvData.summary}</p>
      </header>

      <section className="cv-section">
        <h2>專業技能</h2>
        <div className="skills-grid">
          {cvData.skills.map((skillGroup, index) => (
            <div key={index} className="skill-category">
              <h3>{skillGroup.category}</h3>
              <ul className="skill-list">
                {skillGroup.items.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <h2>工作經驗</h2>
        {cvData.experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.position} - {exp.company}</h3>
            <div className="period">{exp.period}</div>
            <ul>
              {exp.description.map((desc, descIndex) => (
                <li key={descIndex}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h2>教育背景</h2>
        {cvData.education.map((edu, index) => (
          <div key={index} className="experience-item">
            <h3>{edu.school}</h3>
            <div className="period">
              {edu.degree} - {edu.major} ({edu.period})
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CV;