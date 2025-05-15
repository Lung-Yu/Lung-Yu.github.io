import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSkills } from '../hooks/useSkills';
import '../styles/Skills.css';
import '../styles/reset-bullets.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { 
  faShieldHalved, 
  faCode, 
  faGears, 
  faNetworkWired, 
  faUsers, 
  faCertificate,
  faCheckCircle,
  faAngleRight,
  faLock,
  faDatabase,
  faCloud,
  faServer,
  faCubes,
  faUserTie,
  faBook,
  faHandshake,
  faFileCode,
  faMicrophone,
  faUserGroup,
  faChartLine,
  faSitemap,
  faToolbox
} from '@fortawesome/free-solid-svg-icons';
import { SkillsTree } from './tree/SkillsTree';

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
      case 'faUsers': return faUsers;
      case 'faCertificate': return faCertificate;
      default: return faCode;
    }
  };
  
  const getSkillItemIcon = (item: string, category: string): IconDefinition => {
    const lowercaseItem = item.toLowerCase();

    // Security skills icons
    if (category === 'security') {
      if (lowercaseItem.includes('governance')) return faShieldHalved;
      if (lowercaseItem.includes('compliance') || lowercaseItem.includes('法規')) return faBook;
      if (lowercaseItem.includes('penetration') || lowercaseItem.includes('滲透')) return faToolbox;
      if (lowercaseItem.includes('vulnerability') || lowercaseItem.includes('弱點')) return faLock;
      if (lowercaseItem.includes('incident') || lowercaseItem.includes('事件')) return faCheckCircle;
      if (lowercaseItem.includes('architecture') || lowercaseItem.includes('架構')) return faSitemap;
      if (lowercaseItem.includes('risk') || lowercaseItem.includes('風險')) return faChartLine;
      if (lowercaseItem.includes('audit') || lowercaseItem.includes('稽核')) return faFileCode;
    }
    
    // Development skills icons
    if (category === 'development') {
      if (lowercaseItem.includes('full-stack') || lowercaseItem.includes('全端')) return faCode;
      if (lowercaseItem.includes('api')) return faNetworkWired;
      if (lowercaseItem.includes('database') || lowercaseItem.includes('資料庫')) return faDatabase;
      if (lowercaseItem.includes('cloud') || lowercaseItem.includes('雲端')) return faCloud;
      if (lowercaseItem.includes('premises') || lowercaseItem.includes('地端')) return faServer;
      if (lowercaseItem.includes('containerization') || lowercaseItem.includes('容器')) return faCubes;
      if (lowercaseItem.includes('ci/cd') || lowercaseItem.includes('自動化部署') || lowercaseItem.includes('pipeline')) return faGears;
    }
    
    // Management skills icons
    if (category === 'management') {
      if (lowercaseItem.includes('leadership') || lowercaseItem.includes('領導')) return faUserTie;
      if (lowercaseItem.includes('training') || lowercaseItem.includes('培訓')) return faUserGroup;
      if (lowercaseItem.includes('project') || lowercaseItem.includes('專案')) return faChartLine;
      if (lowercaseItem.includes('collaboration') || lowercaseItem.includes('協作') || lowercaseItem.includes('team')) return faHandshake;
      if (lowercaseItem.includes('requirements') || lowercaseItem.includes('需求') || lowercaseItem.includes('analysis')) return faSitemap;
      if (lowercaseItem.includes('documentation') || lowercaseItem.includes('文件')) return faFileCode;
      if (lowercaseItem.includes('client') || lowercaseItem.includes('客戶') || lowercaseItem.includes('communication')) return faHandshake;
      if (lowercaseItem.includes('speaking') || lowercaseItem.includes('演講')) return faMicrophone;
    }

    // Fallback category-specific icon if no match
    if (category === 'security') return faShieldHalved;
    if (category === 'development') return faCode;
    if (category === 'management') return faUsers;
    
    // Final fallback
    return faAngleRight;
  };

  if (loading || !skills) {
    return (
      <section className="skills skills-feature-namespace" id="skills">
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
    <section className="skills skills-feature-namespace" id="skills">
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
              <div key={key} className="skill-card skill-card-custom">
                <div className="skill-card-header">
                  <div className="skill-icon">
                    <FontAwesomeIcon icon={getIcon(category.icon)} />
                  </div>
                  <div className="skill-title">
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                  </div>
                </div>
                <div className="skills-list-wrapper">
                  <ul className="skills-items-list skills-clean-list">
                    {category.items.map((item: string, index: number) => (
                      <li key={index} className="skills-item no-bullet">
                        <div className="skills-item-content">
                          <span className="skills-item-icon">
                            <FontAwesomeIcon icon={getSkillItemIcon(item, key)} />
                          </span>
                          <span className="skills-item-text">{item}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
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
