import { useTranslation } from 'react-i18next';
import { useCV } from '../hooks/useCV';
import '../styles/CV.css';

const CV = () => {
  const { cvData, isLoading } = useCV();
  const { t } = useTranslation();

  if (isLoading) {
    return <div className="cv-container">Loading...</div>;
  }

  // 防護性檢查
  const experiences = Array.isArray(cvData.experiences) ? cvData.experiences : [];
  const education = Array.isArray(cvData.education) ? cvData.education : [];
  const skills = Array.isArray(cvData.skills) ? cvData.skills : [];

  return (
    <div className="cv-container">
      <header className="cv-header">
        <h1>{cvData.name}</h1>
        <div className="title">{cvData.title}</div>
        <p>{cvData.summary}</p>
      </header>

      <section className="cv-section">
        <h2>{cvData.sections.skills}</h2>
        <div className="skills-grid">
          {skills.map((skillGroup, index) => (
            <div key={index} className="skill-category">
              <h3>{skillGroup.category}</h3>
              <ul className="skill-list">
                {skillGroup.items?.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <h2>{cvData.sections.experience}</h2>
        {experiences.map((exp, index) => (
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
        <h2>{cvData.sections.education}</h2>
        {education.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.school}</h3>
            <div className="period">
              {edu.degree} - {edu.major} ({edu.period})
            </div>
            {edu.description && (
              <ul className="education-description">
                {edu.description.map((desc, descIndex) => (
                  <li key={descIndex}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {cvData.conferences && (
        <section className="cv-section">
          <h2>{cvData.sections.conferences}</h2>
          <div className="conferences-grid">
            {cvData.conferences.map((conf, index) => (
              <div key={index} className="conference-item">
                <h4>{conf.title}</h4>
                <span className="date">{conf.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CV;