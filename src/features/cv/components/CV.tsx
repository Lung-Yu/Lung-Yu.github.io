import { useTranslation } from 'react-i18next';
import { useCV } from '../hooks/useCV';
import '../styles/CV.css';
import { Key } from 'react';

const CV = () => {
  const { t } = useTranslation();
  const { cvData } = useCV();

  return (
    <div className="cv-container">
      <header className="cv-header">
        <h1>{cvData.name}</h1>
        <div className="title">{t('cv.title')}</div>
        <p>{t('cv.summary')}</p>
      </header>

      <section className="cv-section">
        <h2>{t('cv.sections.skills')}</h2>
        <div className="skills-grid">
          {cvData.skills.map((skillGroup, index) => (
            <div key={index} className="skill-category">
              <h3>{t(`cv.skills.categories.${skillGroup.category}`, skillGroup.category)}</h3>
              <ul className="skill-list">
                {skillGroup.items.map((skill, skillIndex) => (
                  <li key={skillIndex}>{t(`cv.skills.items.${skill}`, skill)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <h2>{t('cv.sections.experience')}</h2>
        {cvData.experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{t(`cv.experience.${index}.position`)} - {t(`cv.experience.${index}.company`)}</h3>
            <div className="period">{t(`cv.experience.${index}.period`)}</div>
            <ul>
              {exp.description.map((desc, descIndex) => (
                <li key={descIndex}>{t(`cv.experience.${index}.description.${descIndex}`, desc)}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="cv-section">
        <h2>{t('cv.sections.education')}</h2>
        {cvData.education.map((edu, index) => (
          <div key={index} className="experience-item">
            <h3>{t(`cv.education.${index}.school`)}</h3>
            <div className="period">
              {t(`cv.education.${index}.degree`)} - {t(`cv.education.${index}.major`)} ({t(`cv.education.${index}.period`)})
            </div>
            {edu.description && (
              <ul className="education-description">
                {edu.description.map((desc: any, descIndex: Key | null | undefined) => (
                  <li key={descIndex}>{t(`cv.education.${index}.description.${descIndex}`, { defaultValue: desc })}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default CV;