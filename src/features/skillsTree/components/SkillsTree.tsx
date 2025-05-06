import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSkillsTree } from '../hooks/useSkillsTree';
import '../styles/SkillsTree.css';
import type { SkillNode } from '../types';

const SkillNodeComponent: React.FC<{ node: SkillNode; level: number }> = ({ node, level }) => {
  const [expanded, setExpanded] = React.useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;

  const getLevelClass = (skillLevel?: string) => {
    switch (skillLevel) {
      case 'basic': return 'skill-level-basic';
      case 'intermediate': return 'skill-level-intermediate';
      case 'advanced': return 'skill-level-advanced';
      case 'expert': return 'skill-level-expert';
      default: return '';
    }
  };

  const handleToggle = () => {
    if (hasChildren) {
      setExpanded(!expanded);
    }
  };

  return (
    <div className={`skill-node skill-node-level-${level} ${getLevelClass(node.level)}`}>
      <div 
        className={`skill-node-header ${hasChildren ? 'has-children' : ''}`}
        onClick={handleToggle}
      >
        {hasChildren && (
          <span className={`skill-node-toggle ${expanded ? 'expanded' : 'collapsed'}`}>
            {expanded ? '▼' : '►'}
          </span>
        )}
        <span className="skill-node-name">{node.name}</span>
        {node.level && <span className={`skill-node-level-badge ${getLevelClass(node.level)}`}>{node.level}</span>}
      </div>
      
      {expanded && hasChildren && (
        <div className="skill-node-children">
          {node.children?.map((child, index) => (
            <SkillNodeComponent key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const SkillsTree: React.FC = () => {
  const { t } = useTranslation('skills');
  const { skillTreeData, loading } = useSkillsTree();

  if (loading || !skillTreeData) {
    return (
      <section className="skills-tree" id="skills-tree">
        <div className="skills-tree-container">
          <div className="skills-tree-header">
            <h2>{t('skillTree.title', 'Skills Tree')}</h2>
            <p>{t('skillTree.description', 'Interactive visualization of my technical skills')}</p>
          </div>
          <div className="skills-tree-loading">Loading skills tree...</div>
        </div>
      </section>
    );
  }

  const { title, description, root } = skillTreeData.skillTree;

  return (
    <section className="skills-tree" id="skills-tree">
      <div className="skills-tree-container">
        <div className="skills-tree-header">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="skills-tree-visualization">
          <div className="skills-tree-legend">
            <div className="legend-item">
              <span className="legend-color skill-level-basic"></span>
              <span className="legend-label">Basic</span>
            </div>
            <div className="legend-item">
              <span className="legend-color skill-level-intermediate"></span>
              <span className="legend-label">Intermediate</span>
            </div>
            <div className="legend-item">
              <span className="legend-color skill-level-advanced"></span>
              <span className="legend-label">Advanced</span>
            </div>
            <div className="legend-item">
              <span className="legend-color skill-level-expert"></span>
              <span className="legend-label">Expert</span>
            </div>
          </div>

          <div className="skills-tree-content">
            <SkillNodeComponent node={root} level={0} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsTree;
