# Skills Feature

## 功能描述 (Feature Description)
Skills 功能用於展示個人的專業技能與能力，採用視覺化的方式呈現不同類型的技能與熟練度。此功能與 CV 功能中的技能區塊相互補充，但更加專注於技能分類、熟練度展示以及更詳細的技能描述。
提供兩種不同的視圖模式：卡片式網格布局和技能樹狀視圖，使用者可以自由切換。

## 核心元件 (Core Components)
- **Skills**: 主要技能展示組件，以卡片式布局展示各類技能
- **SkillsTree**: 樹狀層級技能展示組件，提供技能間的層級關係視覺化

## 檔案結構
```
skills/
├── README.md                     # 功能說明文件
├── components/
│   ├── Skills.tsx                # 主要技能展示元件
│   └── tree/
│       └── SkillsTree.tsx        # 技能樹狀視圖元件
├── data/                         # 多語系資料存放處
│   ├── en.json                   # 英文技能卡片資料
│   ├── zh-TW.json                # 繁體中文技能卡片資料
│   └── tree/                     # 技能樹資料
│       ├── en.json               # 英文技能樹資料
│       └── zh-TW.json            # 繁體中文技能樹資料
├── hooks/
│   ├── useSkills.ts              # 技能卡片資料載入與處理 hook
│   └── useSkillsTree.ts          # 技能樹資料載入與處理 hook
├── styles/
│   ├── Skills.css                # 主要技能卡片樣式
│   └── tree/
│       └── SkillsTree.css        # 技能樹視圖樣式
└── types/
    ├── index.ts                  # 技能卡片相關型別定義
    └── tree/
        └── index.ts              # 技能樹相關型別定義
```

## 多語系資料結構

本功能遵循 feature-based 架構模式進行國際化設計。每個功能包含自己的 data 目錄，內有針對不同語言的 JSON 檔案：

- `data/en.json` - 包含英文版技能卡片資料
- `data/zh-TW.json` - 包含繁體中文版技能卡片資料
- `data/tree/en.json` - 包含英文版技能樹狀資料
- `data/tree/zh-TW.json` - 包含繁體中文版技能樹狀資料

UI 文字（如按鈕、區段標題等）仍保留在全局 i18n 資源中。

### 技能卡片資料結構

技能卡片語言檔案使用以下結構：

```json
{
  "skillCategories": {
    "security": {
      "title": "Information Security",
      "description": "Security Assessment and Protection",
      "icon": "faShieldHalved",
      "items": [
        "Penetration Testing & Vulnerability Scanning",
        "Security Incident Response",
        "Secure Software Development Lifecycle"
      ]
    },
    "development": {
      "title": "Software Development",
      "description": "Full-stack Development Skills",
      "icon": "faCode",
      "items": [
        "Frontend: React, TypeScript, JavaScript",
        "Backend: Node.js, Python, Java"
      ]
    }
  }
}
```

### 技能樹資料結構

技能樹語言檔案使用以下結構：

```json
{
  "skillTree": {
    "title": "Skills Tree",
    "description": "Hierarchical view of my technical skills",
    "root": {
      "name": "Technical Skills",
      "children": [
        {
          "name": "Information Security",
          "level": "expert",
          "children": [
            {
              "name": "Offensive Security",
              "level": "advanced",
              "children": [
                {"name": "Penetration Testing", "level": "expert"},
                {"name": "Vulnerability Assessment", "level": "expert"}
              ]
            }
          ]
        }
      ]
    }
  }
}
```

## 特色功能
- 視覺化技能展示，使用進度條或圖示表示熟練度
- 技能分類系統，清晰區分不同領域的專業能力
- 技能樹層級視圖，展示技能間的關聯性
- 視圖切換功能，支持網格與樹狀兩種不同的顯示方式
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
import { Skills, SkillsTree } from '../features/skills';

const SkillsPage = () => {
  return (
    <div className="skills-container">
      <h1>專業技能</h1>
      {/* 使用默認視圖（包含視圖切換功能） */}
      <Skills />
      
      {/* 或是單獨使用樹狀視圖 */}
      <SkillsTree />
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