import { useTranslation } from 'react-i18next';
import { useSkills } from '../hooks/useSkills';
import '../styles/Skills.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faShieldHalved, faCode, faGears } from '@fortawesome/free-solid-svg-icons';

const Skills = () => {
  const { t } = useTranslation('skills');
  const { skills } = useSkills();

  const categoryIcons: Record<string, IconDefinition> = {
    security: faShieldHalved,
    development: faCode,
    devops: faGears
  };

  return (
    <section className="skills" id="skills">
      <div className="skills-container">
        <div className="skills-header">
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>

        <div className="skills-grid">
          {Object.keys(skills.categories).map((key) => (
            <div key={key} className="skill-card">
              <div className="skill-icon">
                <FontAwesomeIcon icon={categoryIcons[key] || faCode} />
              </div>
              <h3>{t(`categories.${key}.title`)}</h3>
              <p>{t(`categories.${key}.description`)}</p>
              <ul className="skill-list">
                {skills.items[key]?.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="certifications-section">
          <h3>{t('certifications.title')}</h3>
          <a href="#certificates" className="view-certificates-link">
            {t('certifications.viewAll')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;
