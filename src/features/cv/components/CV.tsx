import { useCV } from '../hooks/useCV';
import '../styles/CV.css';
import LanguageSwitcher from '../../../shared/components/LanguageSwitcher/LanguageSwitcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const CV = () => {
  const { cvData, isLoading, t } = useCV();
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [expandedEdu, setExpandedEdu] = useState<number | null>(null);
  const [allExperiencesExpanded, setAllExperiencesExpanded] = useState(false);
  const [allEducationExpanded, setAllEducationExpanded] = useState(false);

  const toggleExperience = (index: number) => {
    setExpandedExp(expandedExp === index ? null : index);
  };

  const toggleEducation = (index: number) => {
    setExpandedEdu(expandedEdu === index ? null : index);
  };

  const toggleAllExperiences = () => {
    if (allExperiencesExpanded) {
      setExpandedExp(null);
    } else {
      setExpandedExp(-1); // -1 表示全部展開
    }
    setAllExperiencesExpanded(!allExperiencesExpanded);
  };

  const toggleAllEducation = () => {
    if (allEducationExpanded) {
      setExpandedEdu(null);
    } else {
      setExpandedEdu(-1); // -1 表示全部展開
    }
    setAllEducationExpanded(!allEducationExpanded);
  };

  if (isLoading) {
    return <div className="cv-container">Loading...</div>;
  }

  const experiences = Array.isArray(cvData.experiences) ? cvData.experiences : [];
  const education = Array.isArray(cvData.education) ? cvData.education : [];
  const skills = Array.isArray(cvData.skills) ? cvData.skills : [];

  const renderDetailItem = (item: string, index: number) => {
    if (item.startsWith('- ')) {
      return <li key={index} className="nested-item">{item.substring(2)}</li>;
    } else if (item.endsWith(':')) {
      return <li key={index} className="nested-header">{item}</li>;
    } else {
      return <li key={index}>{item}</li>;
    }
  };

  const renderExperienceContent = (exp: any, index: number) => {
    if (exp.brief && exp.details) {
      return (
        <div 
          className={`experience-content ${(expandedExp === index || expandedExp === -1) ? 'expanded' : ''}`}
          onClick={() => toggleExperience(index)}
        >
          <div className="experience-summary">
            <div className="experience-date">{exp.period}</div>
            <div className="experience-company">{exp.company}</div>
            <div className="experience-position">{exp.position}</div>
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`toggle-icon ${(expandedExp === index || expandedExp === -1) ? 'expanded' : ''}`}
            />
          </div>
          <div className="experience-brief">
            <ul>
              {exp.brief.map((item: string, _idx: number) => (
                <li key={_idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="experience-details">
            <ul>
              {exp.details.map((item: string, idx: number) => (
                renderDetailItem(item, idx)
              ))}
            </ul>
          </div>
        </div>
      );
    }

    // 處理舊格式的經歷資料
    return (
      <div className="experience-content">
        <div className="experience-summary">
          <div className="experience-date">{exp.period}</div>
          <div className="experience-company">{exp.company}</div>
          <div className="experience-position">{exp.position}</div>
        </div>
        <ul className="experience-description">
          {exp.description?.map((desc: string, _idx: number) => (
            <li key={_idx}>{desc}</li>
          ))}
        </ul>
      </div>
    );
  };

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
        <div className="section-header">
          <h2>{cvData.sections.experience}</h2>
          <button
            className={`expand-all-button ${allExperiencesExpanded ? 'expanded' : ''}`}
            onClick={toggleAllExperiences}
          >
            {allExperiencesExpanded ? t('actions.collapseAll') : t('actions.expandAll')}
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`toggle-icon ${allExperiencesExpanded ? 'expanded' : ''}`}
            />
          </button>
        </div>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              {renderExperienceContent(exp, index)}
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <div className="section-header">
          <h2>{cvData.sections.education}</h2>
          <button
            className={`expand-all-button ${allEducationExpanded ? 'expanded' : ''}`}
            onClick={toggleAllEducation}
          >
            {allEducationExpanded ? t('actions.collapseAll') : t('actions.expandAll')}
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`toggle-icon ${allEducationExpanded ? 'expanded' : ''}`}
            />
          </button>
        </div>
        <div className="education-grid">
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <div
                className={`education-content ${(expandedEdu === index || expandedEdu === -1) ? 'expanded' : ''}`}
                onClick={() => toggleEducation(index)}
              >
                <div className="education-header">
                  <div className="education-school">{edu.school}</div>
                  <div className="education-degree">
                    {edu.degree} - {edu.major}
                  </div>
                  <div className="education-period">{edu.period}</div>
                  {edu.description && (
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`toggle-icon ${expandedEdu === index ? 'expanded' : ''}`}
                    />
                  )}
                </div>
                {edu.description && (
                  <div className="education-details">
                    <ul className="education-description">
                      {edu.description.map((desc, descIndex) => (
                        <li key={descIndex}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
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
