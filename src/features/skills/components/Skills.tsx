import { useTranslation } from 'react-i18next';
import { useSkills } from '../hooks/useSkills';
import '../styles/Skills.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faShieldHalved, faCode, faGears } from '@fortawesome/free-solid-svg-icons';

const Skills = () => {
  const { t } = useTranslation('skills');
  const { skills, loading } = useSkills();

  const getIcon = (iconName: string): IconDefinition => {
    switch (iconName) {
      case 'faShieldHalved': return faShieldHalved;
      case 'faCode': return faCode;
      case 'faGears': return faGears;
      default: return faCode;
    }
  };

  if (loading || !skills) {
    return (
      <section className="skills" id="skills">
        <div className="skills-container">
          <div className="skills-header">
            <h2>{t('title')}</h2>
            <p>{t('description')}</p>
          </div>
          <div className="skills-loading">
            <p>Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="skills" id="skills">
      <div className="skills-container">
        <div className="skills-header">
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>

        <div className="skills-grid">
          {Object.entries(skills.skillCategories).map(([key, category]) => (
            <div key={key} className="skill-card">
              <div className="skill-icon">
                <FontAwesomeIcon icon={getIcon(category.icon)} />
              </div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <ul className="skill-list">
                {category.items.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
