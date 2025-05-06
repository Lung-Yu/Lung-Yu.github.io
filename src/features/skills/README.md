# Skills Feature

## 功能描述 (Feature Description)
Skills 功能用於展示個人的專業技能與能力，採用視覺化的方式呈現不同類型的技能與熟練度。此功能與 CV 功能中的技能區塊相互補充，但更加專注於技能分類、熟練度展示以及更詳細的技能描述。

## 核心元件 (Core Components)
- **Skills**: 主要技能展示組件，以卡片式布局展示各類技能

## 檔案結構
```
skills/
├── README.md             # 功能說明文件
├── components/
│   └── Skills.tsx        # 主要技能展示元件
├── data/                 # 多語系資料存放處
│   ├── en.json           # 英文技能資料
│   └── zh-TW.json        # 繁體中文技能資料
├── hooks/
│   └── useSkills.ts      # 技能資料載入與處理 hook
├── styles/
│   └── Skills.css        # 主要樣式
└── types/
    └── index.ts          # 技能相關型別定義
```

## 多語系資料結構

本功能遵循 feature-based 架構模式進行國際化設計。每個功能包含自己的 data 目錄，內有針對不同語言的 JSON 檔案：

- `data/en.json` - 包含英文版技能資料
- `data/zh-TW.json` - 包含繁體中文版技能資料

UI 文字（如按鈕、區段標題等）仍保留在全局 i18n 資源中。

### 資料結構

每個語言檔案使用以下結構：

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