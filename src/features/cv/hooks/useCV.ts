import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import cvJson from '../data/cv.json';
import type { CVData } from '../types';

export const useCV = () => {
  const { t, i18n } = useTranslation();
  
  const cvData = useMemo(() => {
    const baseData = cvJson.cv as CVData;
    
    // 使用 i18n 的翻譯機制
    const localizedSkills = baseData.skills.map(skillGroup => {
      const categoryKey = getCategoryKey(skillGroup.category);
      return {
        ...skillGroup,
        category: t(`cv.skills.categories.${categoryKey}`)
      };
    });

    return {
      ...baseData,
      skills: localizedSkills
    };
  }, [i18n.language, t]);

  return { cvData };
};

// 將中文類別名稱對應到翻譯鍵值
const getCategoryKey = (category: string): string => {
  const categoryKeyMap: Record<string, string> = {
    '資安技能': 'security',
    '開發技能': 'development',
    '管理技能': 'management'
  };
  
  return categoryKeyMap[category] || category.toLowerCase();
};