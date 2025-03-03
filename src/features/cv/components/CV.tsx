import { useCV } from '../hooks/useCV';
import '../styles/CV.css';
import LanguageSwitcher from '../../../shared/components/LanguageSwitcher/LanguageSwitcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const CV = () => {
  const { cvData, isLoading } = useCV();

  if (isLoading) {
    return <div className="cv-container">Loading...</div>;
  }

  const experiences = Array.isArray(cvData.experiences) ? cvData.experiences : [];
  const education = Array.isArray(cvData.education) ? cvData.education : [];
  const skills = Array.isArray(cvData.skills) ? cvData.skills : [];

  return (
    <div className="cv-container">
      <header className="cv-header">
        <div>
          <h1>{cvData.name}</h1>
          <div className="title">{cvData.title}</div>
          <p>{cvData.summary}</p>
        </div>
        <div className="language-switcher-container">
          <LanguageSwitcher />
        </div>
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
                <div className="conference-header">
                  <h4>
                    {conf.title}
                    {conf.url && (
                      <a
                        href={conf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="conference-link"
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" />
                      </a>
                    )}
                  </h4>
                  {conf.tags && (
                    <div className="conference-tags">
                      {conf.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="conference-info">
                  {conf.organizer && (
                    <div className="conference-organizer">
                      <i className="fas fa-users-gear"></i>
                      {conf.organizer}
                    </div>
                  )}
                  <span className="conference-date">
                    <i className="fas fa-calendar"></i>
                    {conf.date}
                  </span>
                  {conf.venue && conf.venue !== '-' && (
                    <div className="conference-venue">
                      <i className="fas fa-location-dot"></i>
                      {conf.venue}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CV;
