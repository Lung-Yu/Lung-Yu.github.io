import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSkills } from '../hooks/useSkills';
import '../styles/Skills.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faShieldHalved, faCode, faGears, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import SkillsTree from './tree/SkillsTree';

const Skills = () => {
  const { t } = useTranslation('skills');
  const { skills, loading } = useSkills();
  const [viewMode, setViewMode] = useState<'grid' | 'tree'>('grid');

  const getIcon = (iconName: string): IconDefinition => {
    switch (iconName) {
      case 'faShieldHalved': return faShieldHalved;
      case 'faCode': return faCode;
      case 'faGears': return faGears;
      case 'faNetworkWired': return faNetworkWired;
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
          
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              {t('gridView', 'Grid View')}
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'tree' ? 'active' : ''}`}
              onClick={() => setViewMode('tree')}
            >
              {t('treeView', 'Tree View')}
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
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
        ) : (
          <div className="skills-tree-view">
            <SkillsTree />
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
