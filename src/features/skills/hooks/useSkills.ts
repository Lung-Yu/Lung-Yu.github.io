import { useTranslation } from 'react-i18next';
import type { SkillsData } from '../types';

export const useSkills = () => {
  const { t } = useTranslation('skills');
  
  const skills: SkillsData = {
    categories: {
      security: {
        title: t('categories.security.title'),
        description: t('categories.security.description')
      },
      development: {
        title: t('categories.development.title'),
        description: t('categories.development.description')
      },
      devops: {
        title: t('categories.devops.title'),
        description: t('categories.devops.description')
      }
    },
    items: {
      security: [
        "滲透測試與漏洞掃描",
        "資安事件應變處理",
        "安全軟體開發生命週期",
        "資安架構規劃與評估",
        "法規遵循與稽核"
      ],
      development: [
        "前端技術: React, TypeScript, JavaScript",
        "後端技術: Node.js, Python, Java",
        "資料庫設計與最佳化",
        "RESTful API 設計",
        "系統架構規劃"
      ],
      devops: [
        "CI/CD Pipeline 建置",
        "容器化技術 Docker & K8s",
        "自動化測試與部署",
        "雲端服務整合",
        "監控與日誌管理"
      ]
    }
  };

  return { skills };
};
