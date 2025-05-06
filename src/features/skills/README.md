# Skills Feature

## 功能描述 (Feature Description)
Skills 功能用於展示個人的專業技能與能力，採用視覺化的方式呈現不同類型的技能與熟練度。此功能與 CV 功能中的技能區塊相互補充，但更加專注於技能分類、熟練度展示以及更詳細的技能描述。

## 核心元件 (Core Components)
- **SkillsGrid**: 主要技能展示網格，以卡片式布局展示各類技能
- **SkillCard**: 單一技能卡片，展示技能名稱、圖標和熟練度
- **SkillCategory**: 技能分類區塊，將相關技能組織在一起

## 檔案結構
```
skills/
├── README.md             # 功能說明文件
├── components/
│   ├── SkillsGrid.tsx    # 主要技能網格元件
│   ├── SkillCard.tsx     # 技能卡片元件
│   └── SkillCategory.tsx # 技能分類元件
├── hooks/
│   └── useSkills.ts      # 技能資料相關 hook
├── styles/
│   ├── Skills.css        # 主要樣式
│   ├── SkillCard.css     # 技能卡片樣式
│   └── SkillCategory.css # 分類樣式
└── types/
    └── index.ts          # 技能相關型別定義
```

## 特色功能
- 視覺化技能展示，使用進度條或圖示表示熟練度
- 技能分類系統，清晰區分不同領域的專業能力
- 高互動性設計，包含動畫和懸停效果
- 響應式布局，自適應不同螢幕尺寸
- 與 CV 功能中的技能區塊協調，保持一致的設計風格
- 支援多語系顯示，完全整合 i18n

## 設計原則
- 保持簡潔清晰的視覺呈現
- 重點突出核心技能與專長
- 使用一致的顏色與設計語言
- 確保與其他功能的視覺協調性
- 優先考慮使用者體驗與資訊可讀性

## 使用方式
在需要展示技能的頁面中引入相關元件：

```tsx
import { SkillsGrid } from '../features/skills';

const SkillsPage = () => {
  return (
    <div className="skills-container">
      <h1>專業技能</h1>
      <SkillsGrid />
    </div>
  );
};
```

## 技術實現
- React 函數式元件與 Hooks
- CSS Grid 與 Flexbox 布局
- 動畫效果透過 CSS transitions 與 animations 實現
- 整合 Font Awesome 提供專業圖標
- 透過 i18n 實現多語系支援