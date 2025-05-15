import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { SkillTreeData } from '../types/tree/index';
import { useSkills } from './useSkills';
import { convertGridDataToTreeData } from '../utils/gridToTreeConverter';

export const useSkillsTree = () => {
  const { i18n } = useTranslation();
  const [skillTreeData, setSkillTreeData] = useState<SkillTreeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // 使用相同的網格視圖資料來源
  const { skills: gridData, loading: gridLoading } = useSkills();

  useEffect(() => {
    // 如果網格資料已經載入，則將其轉換為樹狀資料
    if (gridData) {
      try {
        // 從網格資料生成樹狀資料
        const treeData = convertGridDataToTreeData(gridData);
        setSkillTreeData(treeData);
        setLoading(false);
      } catch (error) {
        console.error('Error converting grid data to tree data:', error);
        
        // 如果轉換失敗，嘗試回退到原始的樹狀資料
        fallbackToOriginalTree();
      }
    } else if (!gridLoading) {
      // 網格資料載入失敗時，回退到原始的樹狀資料
      fallbackToOriginalTree();
    }
  }, [gridData, gridLoading]);
  
  // 回退函數：當網格資料不可用或轉換失敗時使用
  const fallbackToOriginalTree = async () => {
    try {
      const lang = i18n.language || 'en';
      const module = await import(`../data/tree/${lang}.json`);
      setSkillTreeData(module.default as SkillTreeData);
    } catch (error) {
      console.error('Error loading fallback skills tree data:', error);
      try {
        const fallbackModule = await import(`../data/tree/en.json`);
        setSkillTreeData(fallbackModule.default as SkillTreeData);
      } catch (fallbackError) {
        console.error('Error loading fallback skills tree data:', fallbackError);
        setSkillTreeData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return { skillTreeData, loading: loading || gridLoading };
};
