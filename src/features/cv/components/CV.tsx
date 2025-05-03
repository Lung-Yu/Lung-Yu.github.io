import { useCV } from '../hooks/useCV';
import '../styles/CV.css';
import '../styles/experience-details.css';
import '../styles/section-controls.css';
import '../styles/company-duration.css';
import '../styles/highlights.css';
import '../styles/skills-display.css';
import '../styles/summary.css';
import '../styles/certificates-summary.css';
import LanguageSwitcher from '../../../shared/components/LanguageSwitcher/LanguageSwitcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExternalLinkAlt, 
  faChevronDown,
  faCode, 
  faUsers, 
  faCodeBranch,
  faTrophy,
  faCertificate,
  faCalendarAlt,
  faMapMarkerAlt,
  faBuilding,
  faDatabase,
  faCloud,
  faTools,
  faClipboardList,
  faProjectDiagram,
  faHeadset,
  faGavel,
  faClipboard,
  faCog,
  faPalette,
  faImage,
  faVolumeUp,
  faGamepad,
  faVrCardboard,
  faCube,
  faRobot,
  faBrain,
  faMicrochip,
  faCommentDots,
  faEye,
  faAward,
  faChartLine,
  faLightbulb,
  faBolt,
  faAtom,
  faCar,
  faCity,
  faFileContract,
  faCoins,
  faGem,
  faWallet,
  faShieldAlt,
  faLock,
  faBug,
  faClipboardCheck,
  faExclamationTriangle,
  faShieldVirus,
  faChalkboardTeacher,
  faFileAlt,
  faCogs,
  faBoxOpen,
  faServer,
  faPenFancy,
  faBullhorn
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useCertificates } from '../../certificates/hooks/useCertificates'; // 新增引入證書hook

// Helper function to get the correct icon for a skill
const getSkillIcon = (skill: string) => {
  return skillIcons[skill] || faCode; // Default to code icon if not found
};

const CV = () => {
  const { cvData, isLoading, t } = useCV();
  const { certificates } = useCertificates(); // 獲取證書數據
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [expandedEdu, setExpandedEdu] = useState<number | null>(null);
  const [allExperiencesExpanded, setAllExperiencesExpanded] = useState(false);
  const [allEducationExpanded, setAllEducationExpanded] = useState(false);
  // 新增：用於存儲已展開的類別區域
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

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
    
    // 處理多語系的「現在」或「Present」
    const isCurrentDate = end === '現在' || end === 'Present';
    const endDate = isCurrentDate ? new Date() : new Date(end.replace('/', '-'));
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const totalMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    
    return {
      years: Math.floor(totalMonths / 12),
      months: totalMonths % 12
    };
  };

  const formatExperienceDuration = (duration: { years: number; months: number }): string => {
    const { years, months } = duration;
    // 判斷當前語言的簡單方法：檢查 cvData 中的標題，如果包含中文就是中文界面
    const isEnglish = cvData.title.includes('Full-Stack');
    
    if (isEnglish) {
      if (years === 0) return `${months} ${months === 1 ? 'month' : 'months'}`;
      if (months === 0) return `${years} ${years === 1 ? 'year' : 'years'}`;
      return `${years} ${years === 1 ? 'year' : 'years'} ${months} ${months === 1 ? 'month' : 'months'}`;
    } else {
      // 中文顯示
      if (years === 0) return `${months}個月`;
      if (months === 0) return `${years}年`;
      return `${years}年${months}個月`;
    }
  };

  // 獲取重要證書(根據value值排序取前4個)
  const getTopCertificates = () => {
    if (!certificates || certificates.length === 0) return [];
    return [...certificates]
      .sort((a, b) => (b.value || 0) - (a.value || 0))
      .slice(0, 4);
  };

  if (isLoading) {
    return <div className="cv-container">Loading...</div>;
  }

  const experiences = Array.isArray(cvData.experiences) ? cvData.experiences : [];
  const education = Array.isArray(cvData.education) ? cvData.education : [];
  const skills = Array.isArray(cvData.skills) ? cvData.skills : [];

  // 更智能的详细信息处理，包含分组功能
  const processDetailItems = (details: string[]) => {
    const sections: { title: string; items: string[] }[] = [];
    let currentSection: { title: string; items: string[] } = { title: '', items: [] };
    
    details.forEach(item => {
      if (item.endsWith(':')) {
        // 新的分類標題
        if (currentSection.title) {
          sections.push({ ...currentSection });
        }
        currentSection = { title: item, items: [] };
      } else {
        // 添加到当前分类
        currentSection.items.push(item);
      }
    });
    
    // 添加最后一个分类
    if (currentSection.title || currentSection.items.length > 0) {
      sections.push(currentSection);
    }
    
    return sections;
  };

  const renderDetailItem = (item: string, index: number) => {
    if (item.startsWith('- ')) {
      // 標準巢狀項目 - 精簡顯示
      const text = item.substring(2);
      // 如果巢狀項目超過100字元，則進行截斷
      if (text.length > 100) {
        return <li key={index} className="nested-item">{text.substring(0, 100)}...</li>;
      }
      return <li key={index} className="nested-item">{text}</li>;
    } else {
      // 主要項目 - 完整顯示
      return <li key={index} className="main-item">{item}</li>;
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
      totalDuration: calculateTotalCompanyDuration(companyMap[company])  // 新增：計算公司總時長
    }));
  };

  // 計算同一公司多個職位的總工作時間
  const calculateTotalCompanyDuration = (positions: any[]): { years: number; months: number } => {
    if (positions.length === 1) {
      return calculateExperienceYears(positions[0].period);
    }

    let earliestDate: string | null = null;
    let latestDate: string | null = null;

    positions.forEach(position => {
      const [start, end] = position.period.split(' - ');
      
      if (!earliestDate || new Date(start.replace('/', '-')) < new Date(earliestDate.replace('/', '-'))) {
        earliestDate = start;
      }
      
      const isCurrentPosition = end === '現在';
      if (!latestDate || isCurrentPosition || 
         (end !== '現在' && new Date(end.replace('/', '-')) > new Date(latestDate.replace('/', '-')))) {
        latestDate = end;
      }
    });

    if (earliestDate && latestDate) {
      // 使用已有的函數來計算總時長
      return calculateExperienceYears(`${earliestDate} - ${latestDate}`);
    }
    
    return { years: 0, months: 0 };
  };

  const groupedExperiences = groupExperiencesByCompany(experiences);    const renderExperienceContent = (exp: any, index: number) => {
    const duration = calculateExperienceYears(exp.period);
    const durationText = formatExperienceDuration(duration);
    const isCurrentJob = exp.period.includes('現在') || exp.period.includes('Present');

    if (exp.brief && exp.details) {
      return (
        <div 
          className={`experience-content ${(expandedExp === index || expandedExp === -1) ? 'expanded' : ''} ${isCurrentJob ? 'current' : ''}`}
          onClick={() => toggleExperience(index)}
        >
          <div className="experience-summary">
            <div className="experience-header">
              <div className="experience-date">
                {exp.period}
                <span className="experience-duration">
                  ({durationText})
                  {isCurrentJob && <span className="current-job-badge">{t('currentPosition', 'Current')}</span>}
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
            <div className="detail-sections">
              {processDetailItems(exp.details).map((section, sectionIndex) => {
                const expIndex = experiences.indexOf(exp);
                const isExpanded = section.title ? isSectionExpanded(expIndex, section.title) : true;
                
                return (
                  <div key={sectionIndex} className="detail-section">
                    {section.title && (
                      <div 
                        className={`detail-section-header ${isExpanded ? 'expanded' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation(); // 防止觸發父元素的點擊事件
                          toggleSection(expIndex, section.title);
                        }}
                      >
                        <h4 className="detail-section-title">{section.title}</h4>
                        <FontAwesomeIcon 
                          icon={faChevronDown} 
                          className={`section-toggle-icon ${isExpanded ? 'expanded' : ''}`}
                        />
                      </div>
                    )}
                    <div className={`detail-section-content ${isExpanded ? 'expanded' : ''}`}>
                      <ul className="detail-items">
                        {isExpanded && section.items.map((item, itemIndex) => (
                          renderDetailItem(item, itemIndex)
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
              {exp.details.length > 3 && (
                <div className="section-controls">
                  <button 
                    className="toggle-sections-button" 
                    onClick={(e) => {
                      e.stopPropagation(); // 防止觸發父元素的點擊事件
                      const expIndex = experiences.indexOf(exp);
                      const sections = processDetailItems(exp.details);
                      toggleAllSections(expIndex, sections, true);
                    }}
                  >
                    {t('actions.expandAll')}
                  </button>
                  <button 
                    className="toggle-sections-button" 
                    onClick={(e) => {
                      e.stopPropagation(); // 防止觸發父元素的點擊事件
                      const expIndex = experiences.indexOf(exp);
                      const sections = processDetailItems(exp.details);
                      toggleAllSections(expIndex, sections, false);
                    }}
                  >
                    {t('actions.collapseAll')}
                  </button>
                </div>
              )}
            </div>
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

  // 切換特定類別的展開狀態
  const toggleSection = (expIndex: number, sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [`${expIndex}-${sectionTitle}`]: !prev[`${expIndex}-${sectionTitle}`]
    }));
  };

  // 檢查特定類別是否已展開
  const isSectionExpanded = (expIndex: number, sectionTitle: string) => {
    return expandedSections[`${expIndex}-${sectionTitle}`] === true;
  };

  // 展開或收起所有類別
  const toggleAllSections = (expIndex: number, sections: {title: string; items: string[]}[], expand: boolean) => {
    const updates: {[key: string]: boolean} = {};
    sections.forEach(section => {
      if (section.title) {
        updates[`${expIndex}-${section.title}`] = expand;
      }
    });
    setExpandedSections(prev => ({...prev, ...updates}));
  };

  // Prepare highlight items
  const renderHighlights = () => {
    const isEnglish = cvData.title.includes('Full-Stack');
    
    const highlights = [
      {
        icon: faCertificate,
        title: isEnglish ? "Multiple Cybersecurity Certifications" : "多項資安認證",
        description: isEnglish ? 
          "Certified in various security domains including CISSP, CEH, and more." : 
          "擁有多項國際資安證照，包括CISSP、CEH等"
      },
      {
        icon: faCodeBranch,
        title: isEnglish ? "DevSecOps Expert" : "DevSecOps 專家",
        description: isEnglish ? 
          "Experienced in integrating security into development workflows." : 
          "專精於將資安融入開發流程"
      },
      {
        icon: faTrophy,
        title: isEnglish ? "Award Winner" : "獲獎經歷",
        description: isEnglish ? 
          "2023 Gama Star Award and multiple technical competitions." : 
          "2023 Gama Star 獎項及多項技術競賽獎項"
      },
      {
        icon: faUsers,
        title: isEnglish ? "Conference Speaker" : "演講講者",
        description: isEnglish ? 
          "Regular speaker at security and development conferences." : 
          "多場資安與開發技術研討會講者"
      }
    ];

    return highlights.map((highlight, index) => (
      <div className="highlight-item" key={index}>
        <h3>
          <FontAwesomeIcon icon={highlight.icon} className="highlight-icon" />
          {highlight.title}
        </h3>
        <p>{highlight.description}</p>
      </div>
    ));
  };

  // 渲染精選證書區塊
  const renderCertificatesSection = () => {
    const topCertificates = getTopCertificates();
    
    if (topCertificates.length === 0) return null;
    
    return (
      <div className="cv-section certificates-summary">
        <h2>
          <FontAwesomeIcon icon={faCertificate} className="section-icon" />
          {t('sections.certificates') || 'Key Certifications'}
        </h2>
        <div className="certificates-grid">
          {topCertificates.map((cert, index) => (
            <div key={index} className="certificate-card">
              <div className="certificate-logo">
                <img src={cert.image} alt={cert.title} />
              </div>
              <div className="certificate-info">
                <h3>{cert.title}</h3>
                <p className="certificate-institution">{cert.institution}</p>
                <p className="certificate-period">
                  {cert.obtainedAt} - {cert.expiryDate === '-' ? (t('ongoing') || 'Current') : cert.expiryDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="cv-container">
      <header className="cv-header">
        <div>
          <h1>{cvData.name}</h1>
          <div className="title">{cvData.title}</div>
          
          <div className="cv-summary">
            {/* 簡約素雅的摘要介紹 */}
            <div className="cv-summary-intro">
              <p>{t('summaryPoints.mainIntro', '結合資安專業與全端開發技術，致力於打造安全且高效能的系統與應用')}</p>
            </div>
            
            {/* 關鍵詞標籤式展示 */}
            <div className="cv-summary-list">
              <span className="cv-summary-tag">
                <span className="cv-summary-tag-icon"><FontAwesomeIcon icon={faCertificate} /></span>
                {t('summaryPoints.keywords.cert', '國際資安認證')}
              </span>
              
              <span className="cv-summary-tag">
                <span className="cv-summary-tag-icon"><FontAwesomeIcon icon={faCodeBranch} /></span>
                {t('summaryPoints.keywords.secdev', '安全開發實踐')}
              </span>
              
              <span className="cv-summary-tag">
                <span className="cv-summary-tag-icon"><FontAwesomeIcon icon={faShieldAlt} /></span>
                {t('summaryPoints.keywords.security', '系統防護')}
              </span>
              
              <span className="cv-summary-tag">
                <span className="cv-summary-tag-icon"><FontAwesomeIcon icon={faCode} /></span>
                {t('summaryPoints.keywords.fullstack', '全端開發')}
              </span>
              
              <span className="cv-summary-tag">
                <span className="cv-summary-tag-icon"><FontAwesomeIcon icon={faUsers} /></span>
                {t('summaryPoints.keywords.training', '技術培訓')}
              </span>
              
              <span className="cv-summary-tag">
                <span className="cv-summary-tag-icon"><FontAwesomeIcon icon={faTrophy} /></span>
                {t('summaryPoints.keywords.achievement', '專業認可')}
              </span>
            </div>
          </div>
          
          <div className="cv-contact-details">
            <a href={`mailto:${cvData.email || 'workfile975@gmail.com'}`} className="cv-contact-item">
              <i className="cv-icon">✉</i> {cvData.email || 'workfile975@gmail.com'}
            </a>
            {cvData.phone && (
              <a href={`tel:${cvData.phone}`} className="cv-contact-item">
                <i className="cv-icon">📱</i> {cvData.phone}
              </a>
            )}
            {cvData.location && (
              <span className="cv-contact-item">
                <i className="cv-icon">📍</i> {cvData.location}
              </span>
            )}
            {cvData.website && (
              <a href={cvData.website} className="cv-contact-item" target="_blank" rel="noopener noreferrer">
                <i className="cv-icon">🌐</i> {cvData.website.replace(/^https?:\/\//, '')}
              </a>
            )}
            {cvData.linkedin && (
              <a href={cvData.linkedin} className="cv-contact-item" target="_blank" rel="noopener noreferrer">
                <i className="cv-icon">in</i> LinkedIn
              </a>
            )}
          </div>
        </div>
        <div className="language-switcher-container">
          <LanguageSwitcher />
        </div>
      </header>
      
      <section className="cv-section highlights-section">
        <h2>{t('sections.highlights', 'Highlights')}</h2>
        <div className="highlights-container">
          {renderHighlights()}
        </div>
      </section>

      {/* 精選證書區塊 */}
      {renderCertificatesSection()}
      
      <section className="cv-section">
        <h2>{cvData.sections.skills}</h2>
        <div className="cv-skills-grid">
          {skills.map((skillGroup, index) => (
            <div 
              key={index} 
              className="cv-skill-category" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3>{skillGroup.category}</h3>
              <ul className="cv-skill-list">
                {skillGroup.items?.map((skill, skillIndex) => (
                  <li 
                    key={skillIndex} 
                    className="cv-skill-item"
                    style={{ animationDelay: `${skillIndex * 0.08}s` }}
                  >
                    <span className="cv-skill-icon">
                      <FontAwesomeIcon icon={getSkillIcon(skill)} />
                    </span>
                    <span className="cv-skill-name">{skill}</span>
                  </li>
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
          {groupedExperiences.map((group) => (
            <div key={group.company} className="experience-company-block">
              <div className="experience-company-header">
                <div className="company-title-wrapper">
                  <span className="experience-company-name">{group.company}</span>
                  {group.totalDuration && (
                    <span className="company-total-duration">
                      {formatExperienceDuration(group.totalDuration)}
                    </span>
                  )}
                  {group.companyNote && (
                    <span className="company-note">{group.companyNote}</span>
                  )}
                </div>
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
                      <FontAwesomeIcon icon={faBuilding} size="sm" className="organizer-icon" />
                      <span className="organizer-text">{conf.organizer}</span>
                    </div>
                  )}
                  <span className="conference-date">
                    <FontAwesomeIcon icon={faCalendarAlt} size="sm" />
                    <span>{conf.date}</span>
                  </span>
                  {conf.venue && conf.venue !== '-' && (
                    <div className="conference-venue">
                      <FontAwesomeIcon icon={faMapMarkerAlt} size="sm" className="venue-icon" />
                      <span className="venue-text">{conf.venue}</span>
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

const skillIcons: { [key: string]: any } = {
  // 工程相關
  '全端工程師': faCode,
  '前端工程師': faCode,
  '後端工程師': faCode,
  'UI/UX 設計師': faCode,
  '資料庫管理': faDatabase,
  '系統架構': faBuilding,
  '雲端服務': faCloud,
  'DevOps': faTools,
  '測試工程師': faTrophy,
  
  // 管理相關
  '產品經理': faClipboardList,
  '專案經理': faProjectDiagram,
  '行銷專員': faBullhorn,
  '客服專員': faHeadset,
  '人資專員': faUsers,
  '財務專員': faCoins,
  '法務專員': faGavel,
  '行政專員': faClipboard,
  '運維工程師': faCog,
  
  // 設計相關
  '網頁設計師': faPalette,
  '平面設計師': faImage,
  '插畫師': faPenFancy,
  '動畫師': faImage,
  '音效師': faVolumeUp,
  
  // 遊戲相關
  '遊戲測試': faGamepad,
  '遊戲設計': faGamepad,
  '遊戲開發': faGamepad,
  '虛擬實境': faVrCardboard,
  '擴增實境': faCube,
  
  // 區塊鏈相關
  '區塊鏈': faCode,
  '智慧合約': faFileContract,
  '去中心化應用': faCode,
  '數位貨幣': faCoins,
  '代幣經濟': faGem,
  'NFT': faImage,
  '數位資產': faWallet,
  
  // AI相關
  '人工智慧': faRobot,
  '機器學習': faBrain,
  '深度學習': faMicrochip,
  '自然語言處理': faCommentDots,
  '電腦視覺': faEye,
  '強化學習': faAward,
  
  // 數據分析相關
  '數據分析': faChartLine,
  '商業智慧': faLightbulb,
  
  // 其他科技相關
  '雲端運算': faCloud,
  '邊緣運算': faBolt,
  '量子運算': faAtom,
  '智慧城市': faCity,
  '自動駕駛': faCar,
  '機器人': faRobot,
  
  // 資安相關
  '網路安全': faShieldAlt,
  '資安防護': faLock,
  '滲透測試': faBug,
  '資安稽核': faClipboardCheck,
  '資安風險評估': faExclamationTriangle,
  '資安事件應變': faShieldVirus,
  '資安教育訓練': faChalkboardTeacher,
  '資安政策制定': faFileAlt,
  '資安標準制定': faCertificate,
  '資安系統整合': faCogs,
  '資安產品管理': faBoxOpen,
  '資安應用程式安全': faLock,
  '資安網路安全': faShieldAlt,
  '資安系統安全': faServer,
  '資安資料庫安全': faDatabase
};

export default CV;
