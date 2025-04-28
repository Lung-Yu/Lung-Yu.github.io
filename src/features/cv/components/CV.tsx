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

  const calculateExperienceYears = (period: string): { years: number; months: number } => {
    const [start, end] = period.split(' - ');
    const startDate = new Date(start.replace('/', '-'));
    const endDate = end === '現在' ? new Date() : new Date(end.replace('/', '-'));
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const totalMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    
    return {
      years: Math.floor(totalMonths / 12),
      months: totalMonths % 12
    };
  };

  const formatExperienceDuration = (duration: { years: number; months: number }): string => {
    const { years, months } = duration;
    if (years === 0) return `${months}個月`;
    if (months === 0) return `${years}年`;
    return `${years}年${months}個月`;
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

  // Group experiences by company, preserving order
  const groupExperiencesByCompany = (experiences: any[]) => {
    const companyMap: { [company: string]: any[] } = {};
    const companyOrder: string[] = [];
    experiences.forEach(exp => {
      if (!companyMap[exp.company]) {
        companyMap[exp.company] = [];
        companyOrder.push(exp.company);
      }
      companyMap[exp.company].push(exp);
    });
    return companyOrder.map(company => ({
      company,
      companyNote: companyMap[company][0].companyNote,
      positions: companyMap[company],
    }));
  };

  const groupedExperiences = groupExperiencesByCompany(experiences);

  const renderExperienceContent = (exp: any, index: number) => {
    const duration = calculateExperienceYears(exp.period);
    const durationText = formatExperienceDuration(duration);
    const isCurrentJob = exp.period.includes('現在');

    if (exp.brief && exp.details) {
      return (
        <div 
          className={`experience-content ${(expandedExp === index || expandedExp === -1) ? 'expanded' : ''}`}
          onClick={() => toggleExperience(index)}
        >
          <div className="experience-summary">
            <div className="experience-header">
              <div className="experience-date">
                {exp.period}
                <span className="experience-duration">
                  ({durationText})
                  {isCurrentJob && <span className="current-job-badge">目前</span>}
                </span>
              </div>
              <div className="experience-position">{exp.position}</div>
            </div>
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
          {groupedExperiences.map((group, groupIdx) => (
            <div key={group.company} className="experience-company-block">
              <div className="experience-company-header">
                <span className="experience-company-name">{group.company}</span>
                {group.companyNote && (
                  <span className="company-note">{group.companyNote}</span>
                )}
              </div>
              <div className="experience-company-positions">
                {group.positions.map((exp, idx) => (
                  <div key={idx} className="experience-item">
                    {renderExperienceContent(exp, experiences.indexOf(exp))}
                  </div>
                ))}
              </div>
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
