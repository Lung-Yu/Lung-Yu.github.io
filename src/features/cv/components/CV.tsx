import { useCV } from '../hooks/useCV';
import '../styles/CV.css';
import '../styles/experience-details.css';
import '../styles/section-controls.css';
import '../styles/company-duration.css';
import '../styles/highlights.css';
import '../styles/skills-display.css';
import '../styles/summary.css';
import '../styles/certificates-summary.css';
import '../styles/conferences-accordion.css';
import '../styles/integrated-header.css';
import '../styles/redesigned-skills.css';
import LanguageSwitcher from '../../../shared/components/LanguageSwitcher/LanguageSwitcher';
import { useState, useEffect } from 'react';
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
import { useCertificates } from '../../certificates/hooks/useCertificates'; // 新增引入證書hook
import type { TFunction } from 'i18next'; // 從 i18next 引入 TFunction 型別

// 渲染重設計的技能區塊
const renderRedesignedSkills = (t: TFunction) => {
  // 安全地獲取翻譯的字符串數組
  const getSafeTranslatedArray = (path: string, defaultValues: string[]): string[] => {
    try {
      const result = t(path, { returnObjects: true });
      // 確保結果是字符串數組
      if (Array.isArray(result)) {
        return result.map(item => String(item));
      }
      return defaultValues;
    } catch (error) {
      console.error(`Translation error for ${path}:`, error);
      return defaultValues;
    }
  };
  
  // 安全地獲取翻譯字符串
  const getSafeTranslation = (path: string, defaultValue: string): string => {
    try {
      const result = t(path);
      return typeof result === 'string' ? result : defaultValue;
    } catch (error) {
      console.error(`Translation error for ${path}:`, error);
      return defaultValue;
    }
  };
  
  // 預設技能內容 (防止翻譯文件缺少時白屏)
  const defaultSecuritySkills = ["Security Governance", "Compliance", "Penetration Testing", "Risk Management"];
  const defaultDevSkills = ["Full-Stack Development", "JavaScript/TypeScript", "React/Node.js", "API Design"];
  const defaultMgmtSkills = ["Team Leadership", "Project Management", "Technical Training", "Communication"];
  
  // 獲取國際化的技能類別
  const skillCategories = [
    {
      key: "security",
      icon: faShieldAlt,
      title: getSafeTranslation('skillCategories.security.title', 'Security Skills'),
      skills: getSafeTranslatedArray('skillCategories.security.skills', defaultSecuritySkills)
    },
    {
      key: "development",
      icon: faCode,
      title: getSafeTranslation('skillCategories.development.title', 'Development Skills'),
      skills: getSafeTranslatedArray('skillCategories.development.skills', defaultDevSkills)
    },
    {
      key: "management",
      icon: faUsers,
      title: getSafeTranslation('skillCategories.management.title', 'Management & Communication'),
      skills: getSafeTranslatedArray('skillCategories.management.skills', defaultMgmtSkills)
    }
  ];
  
  return (
    <div className="skills-main-grid">
      {skillCategories.map((category, index) => (
        <div key={index} className="skill-category-box">
          <div className="skill-category-title">
            <FontAwesomeIcon icon={category.icon} className="skill-category-icon" />
            <h3>{category.title}</h3>
          </div>
          <div className="skills-list">
            {category.skills.map((skill, idx) => (
              <div key={idx} className="skill-item">{skill}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
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
  // 新增：用於追蹤展開的演講年份
  const [expandedConferenceYears, setExpandedConferenceYears] = useState<{[year: string]: boolean}>({});
  // 新增：用於追蹤是否全部展開演講年份
  const [allConferencesExpanded, setAllConferencesExpanded] = useState(false);

  const toggleExperience = (index: number) => {
    setExpandedExp(expandedExp === index ? null : index);
  };
  
  // 展開/收起所有演講年份分組
  const toggleAllConferences = () => {
    console.log(`Toggle all conferences, current state: ${allConferencesExpanded}`);
    const years = getConferencesByYear().map(group => group.year);
    const newState: {[year: string]: boolean} = {};
    
    if (allConferencesExpanded) {
      // 如果目前是全部展開，則全部收合
      years.forEach(year => {
        newState[year] = false;
      });
      console.log("收合所有年份");
    } else {
      // 如果目前是部分或全部收合，則全部展開
      years.forEach(year => {
        newState[year] = true;
      });
      console.log("展開所有年份");
    }
    
    // 更新狀態 - 直接完全替換之前的狀態
    setExpandedConferenceYears(newState);
    setAllConferencesExpanded(!allConferencesExpanded);
    console.log("Set new states:", newState);
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
    const isCurrentDate = end === t('ongoing');
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
    
    if (years === 0) {
      return t('duration.monthsOnly', { count: months, months });
    }
    if (months === 0) {
      return t('duration.yearsOnly', { count: years, years });
    }
    return t('duration.yearsAndMonths', { years, months });
  };

  // 獲取精選證書(根據value值排序取前4個)
  const getTopCertificates = () => {
    if (!certificates || certificates.length === 0) return [];
    return [...certificates]
      .sort((a, b) => (b.value || 0) - (a.value || 0))
      .slice(0, 4);
  };

  // 演講資料按年份分組
  const getConferencesByYear = () => {
    if (!cvData.conferences || !Array.isArray(cvData.conferences) || cvData.conferences.length === 0) {
      return [];
    }

    // 先按日期降序排序
    const sortedConferences = [...cvData.conferences].sort((a, b) => {
      // 假設日期格式為 'YYYY/MM/DD' 或 'YYYY-MM-DD'
      const dateA = new Date(a.date.replace(/\//g, '-'));
      const dateB = new Date(b.date.replace(/\//g, '-'));
      return dateB.getTime() - dateA.getTime();
    });

    // 按年份分組
    const conferencesByYear: { [key: string]: any[] } = {};
    sortedConferences.forEach(conference => {
      // 從日期提取年份
      const year = conference.date.split(/\/|-/)[0];
      if (!conferencesByYear[year]) {
        conferencesByYear[year] = [];
      }
      conferencesByYear[year].push(conference);
    });

    // 轉換為陣列並按年份降序排序
    return Object.keys(conferencesByYear)
      .sort((a, b) => Number(b) - Number(a)) // 降序排序年份
      .map(year => ({
        year,
        conferences: conferencesByYear[year]
      }));
  };

  // 展開/收起年份分組
  const toggleYearExpansion = (year: string) => {
    console.log(`Toggling year ${year}`);
    setExpandedConferenceYears(prev => {
      // 獲取目前的展開狀態
      const isCurrentlyExpanded = !!prev[year];
      // 創建新的狀態對象
      const newState = {
        ...prev,
        [year]: !isCurrentlyExpanded
      };
      console.log(`Year ${year} toggle: Current state=${isCurrentlyExpanded}, new state=${!isCurrentlyExpanded}`);
      return newState;
    });
  };

  // 初始展開最近一年
  useEffect(() => {
    const conferenceYears = getConferencesByYear();
    if (conferenceYears.length > 0) {
      const mostRecentYear = conferenceYears[0].year;
      console.log(`Initializing conference years, most recent year: ${mostRecentYear}`);
      
      // 創建一個新的狀態對象
      const newState: {[year: string]: boolean} = {};
      // 只將最新年份設為展開狀態
      newState[mostRecentYear] = true;
      
      // 直接設置狀態，替換先前的所有狀態
      setExpandedConferenceYears(newState);
      setAllConferencesExpanded(false);
      console.log(`Initial conference state set: `, newState);
    }
  }, []);

  // 安全地獲取翻譯字符串
  const getSafeTranslation = (path: string, defaultValue: string): string => {
    try {
      const result = t(path);
      return typeof result === 'string' ? result : defaultValue;
    } catch (error) {
      console.error(`Translation error for ${path}:`, error);
      return defaultValue;
    }
  };

  if (isLoading) {
    return <div className="cv-container">{getSafeTranslation('loading', 'Loading...')}</div>;
  }

  const experiences = Array.isArray(cvData.experiences) ? cvData.experiences : [];
  const education = Array.isArray(cvData.education) ? cvData.education : [];

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
      
      const isCurrentPosition = end === t('ongoing');
      if (!latestDate || isCurrentPosition || 
         (end !== t('ongoing') && new Date(end.replace('/', '-')) > new Date(latestDate.replace('/', '-')))) {
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
    const isCurrentJob = exp.period.includes(t('ongoing'));

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
                  {isCurrentJob && <span className="current-job-badge">{getSafeTranslation('currentPosition', 'Current')}</span>}
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

  // Prepare achievement items
  const renderHighlights = (t: TFunction) => {
    // 安全地獲取翻譯字符串
    const getSafeTranslation = (path: string, defaultValue: string): string => {
      try {
        const result = t(path);
        return typeof result === 'string' ? result : defaultValue;
      } catch (error) {
        console.error(`Translation error for ${path}:`, error);
        return defaultValue;
      }
    };
    
    const achievements = [
      {
        icon: faCertificate,
        title: getSafeTranslation('highlights.certifications.title', 'Multiple Security Certifications'),
        description: getSafeTranslation('highlights.certifications.description', 'CISSP, CEH, and other recognized certifications in cybersecurity.')
      },
      {
        icon: faCodeBranch,
        title: getSafeTranslation('highlights.devsecops.title', 'DevSecOps Expert'),
        description: getSafeTranslation('highlights.devsecops.description', 'Integrating security into development workflows.')
      },
      {
        icon: faTrophy,
        title: getSafeTranslation('highlights.recognition.title', 'Industry Recognition'),
        description: getSafeTranslation('highlights.recognition.description', 'Award recipient, recognized for technical excellence.')
      },
      {
        icon: faUsers,
        title: getSafeTranslation('highlights.speaking.title', 'Technical Speaker'),
        description: getSafeTranslation('highlights.speaking.description', 'Regular speaker at conferences on security and development topics.')
      }
    ];

    return achievements.map((item, index) => (
      <div className="achievement-card" key={index}>
        <div className="achievement-title">
          <FontAwesomeIcon icon={item.icon} className="achievement-icon" />
          {item.title}
        </div>
        <p className="achievement-text">{item.description}</p>
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
                  {cert.obtainedAt} - {cert.expiryDate === '-' ? (getSafeTranslation('ongoing', 'Present')) : cert.expiryDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染專業標籤
  const renderProfessionalTags = () => {
    return (
      <div className="professional-tags">
        <div className="professional-tag">
          <FontAwesomeIcon icon={faCertificate} className="tag-icon" />
          {t('summaryPoints.keywords.cert', '國際資安認證')}
        </div>
        
        <div className="professional-tag">
          <FontAwesomeIcon icon={faCodeBranch} className="tag-icon" />
          {t('summaryPoints.keywords.secdev', '安全開發實踐')}
        </div>
        
        <div className="professional-tag">
          <FontAwesomeIcon icon={faShieldAlt} className="tag-icon" />
          {t('summaryPoints.keywords.security', '系統防護')}
        </div>
        
        <div className="professional-tag">
          <FontAwesomeIcon icon={faCode} className="tag-icon" />
          {t('summaryPoints.keywords.fullstack', '全端開發')}
        </div>
        
        <div className="professional-tag">
          <FontAwesomeIcon icon={faUsers} className="tag-icon" />
          {t('summaryPoints.keywords.training', '技術培訓')}
        </div>
        
        <div className="professional-tag">
          <FontAwesomeIcon icon={faTrophy} className="tag-icon" />
          {t('summaryPoints.keywords.achievement', '專業認可')}
        </div>
      </div>
    );
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="cv-container">
      {/* 整合式頁頭 - 合併個人簡介與聯絡資訊 */}
      <header className="cv-integrated-header">
        <div className="cv-integrated-layout">
          {/* 個人簡介區塊 */}
          <div className="cv-intro-section">
            <h1>{cvData.name}</h1>
            <div className="title">{cvData.title}</div>
            <p>{t('summaryPoints.mainIntro', '結合資安專業與全端開發技術，致力於打造安全且高效能的系統與應用')}</p>
          </div>
          
          {/* 聯絡資訊區塊 */}
          <div className="cv-contact-section">
            <a href={`mailto:${cvData.email || 'workfile975@gmail.com'}`} className="cv-contact-item">
              <FontAwesomeIcon icon={faExternalLinkAlt} className="cv-contact-icon" />
              {cvData.email || 'workfile975@gmail.com'}
            </a>
            {cvData.phone && (
              <a href={`tel:${cvData.phone}`} className="cv-contact-item">
                <FontAwesomeIcon icon={faHeadset} className="cv-contact-icon" />
                {cvData.phone}
              </a>
            )}
            {cvData.location && (
              <div className="cv-contact-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="cv-contact-icon" />
                {cvData.location}
              </div>
            )}
            {cvData.website && (
              <a href={cvData.website} className="cv-contact-item" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="cv-contact-icon" />
                {cvData.website.replace(/^https?:\/\//, '')}
              </a>
            )}
            {cvData.linkedin && (
              <a href={cvData.linkedin} className="cv-contact-item" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faUsers} className="cv-contact-icon" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
        
        {/* 語言切換器 */}
        <div className="language-selector">
          <LanguageSwitcher />
        </div>
      </header>
      
      {/* 專業亮點區塊 - 整合標籤與成就 */}
      <section className="cv-section professional-highlights">
        <h2>{t('sections.highlights', 'Professional Highlights')}</h2>
        
        {/* 專業標籤 */}
        {renderProfessionalTags()}
        
        {/* 主要成就 */}
        <div className="achievement-grid">
          {renderHighlights(t)}
        </div>
      </section>

      {/* 精選證書區塊 */}
      {renderCertificatesSection()}
      
      <section className="cv-section skills-section">
        <h2>{cvData.sections.skills}</h2>
        {renderRedesignedSkills(t)}
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
          {/* 控制區：展開/收起所有年份 */}
          <div className="section-header">
            <h2>{cvData.sections.conferences}</h2>
            <button
              className={`expand-all-button ${allConferencesExpanded ? 'expanded' : ''}`}
              onClick={toggleAllConferences}
            >
              {allConferencesExpanded ? t('actions.collapseAll') : t('actions.expandAll')}
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`toggle-icon ${allConferencesExpanded ? 'expanded' : ''}`}
              />
            </button>
          </div>
          
          {/* 按年份顯示演講 */}
          <div className="conferences-accordion">
            {getConferencesByYear().map(yearGroup => (
              <div key={yearGroup.year} className="conference-year-group">
                <div 
                  className={`conference-year-header ${expandedConferenceYears[yearGroup.year] === true ? 'active' : ''}`} 
                  onClick={() => toggleYearExpansion(yearGroup.year)}
                >
                  <h3>
                    <FontAwesomeIcon icon={faCalendarAlt} style={{marginRight: '0.5rem'}} />
                    {yearGroup.year} ({yearGroup.conferences.length})
                  </h3>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`conference-year-toggle ${expandedConferenceYears[yearGroup.year] === true ? 'expanded' : ''}`} 
                  />
                </div>
                
                <div 
                  className={`conference-year-content ${expandedConferenceYears[yearGroup.year] === true ? 'expanded' : ''}`}
                >
                  <ul className="conference-list">
                    {yearGroup.conferences.map((conf, index) => (
                      <li key={index} className="conference-list-item">
                        {/* 主要信息行：標題和日期 */}
                        <div className="conference-primary-info">
                          <div className="conference-title-container">
                            <h4 className="conference-title">{conf.title}</h4>
                            {conf.url && (
                              <a
                                href={conf.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="conference-external-link"
                              >
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                              </a>
                            )}
                          </div>
                          <div className="conference-date">
                            <FontAwesomeIcon icon={faCalendarAlt} size="sm" />
                            <span>{conf.date}</span>
                          </div>
                        </div>
                        
                        {/* 次要信息：組織者和地點 */}
                        <div className="conference-secondary-info">
                          {conf.organizer && (
                            <div className="conference-organizer">
                              <FontAwesomeIcon icon={faBuilding} size="sm" />
                              <span>{conf.organizer}</span>
                            </div>
                          )}
                          
                          {conf.venue && conf.venue !== '-' && (
                            <div className="conference-venue">
                              <FontAwesomeIcon icon={faMapMarkerAlt} size="sm" />
                              <span>{conf.venue}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* 標籤 */}
                        {conf.tags && conf.tags.length > 0 && (
                          <div className="conference-tags">
                            {conf.tags.map((tag: string, tagIndex: number) => (
                              <span key={tagIndex} className="conference-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// This skillIcons mapping is kept for potential future use in dynamic icon generation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// Export the CV component as default
export default CV;

// Export a mapping of skill names to their corresponding icons
// This can be imported by other components if needed for consistency
export const skillIcons = {
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
