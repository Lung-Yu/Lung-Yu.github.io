// Grid 資料轉換為樹狀結構的實用工具
import { SkillsData } from '../types';
import { SkillTreeData, SkillNode, SkillLevel } from '../types/tree';

interface CategorySkillPair {
  categoryName: string;
  skillName: string;
}

/**
 * 將網格視圖的扁平資料結構轉換為樹狀結構
 * @param gridData 網格視圖資料
 * @returns 樹狀視圖資料結構
 */
export function convertGridDataToTreeData(gridData: SkillsData): SkillTreeData {
  // 創建根節點
  const treeData: SkillTreeData = {
    skillTree: {
      title: "Skills Tree",
      description: "Hierarchical view of my technical skills",
      root: {
        name: "Technical Skills",
        children: []
      }
    }
  };

  // 為每個技能類別創建一個主節點
  Object.entries(gridData.skillCategories).forEach(([categoryKey, category]) => {
    // 決定技能級別 (目前假設為advanced，之後可以細化)
    const categoryLevel: SkillLevel = "advanced";
    
    // 創建技能類別節點
    const categoryNode: SkillNode = {
      name: category.title,
      level: categoryLevel,
      children: []
    };
    
    // 將技能項目添加到類別節點
    category.items.forEach(skill => {
      // 判斷技能可能的層級 (示例邏輯)
      let skillLevel: SkillLevel = "intermediate";
      
      // 根據技能名稱中的關鍵字推斷熟練度
      const lowerCaseSkill = skill.toLowerCase();
      if (lowerCaseSkill.includes('expert') || 
          lowerCaseSkill.includes('advanced') ||
          lowerCaseSkill.includes('senior')) {
        skillLevel = "advanced";
      } else if (lowerCaseSkill.includes('basic') ||
                lowerCaseSkill.includes('beginner')) {
        skillLevel = "basic";
      }
      
      // 添加技能節點
      categoryNode.children!.push({
        name: skill,
        level: skillLevel
      });
    });
    
    // 將類別節點添加到根節點
    treeData.skillTree.root.children.push(categoryNode);
  });

  return treeData;
}
