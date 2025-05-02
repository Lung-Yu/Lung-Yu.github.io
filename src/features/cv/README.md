# CV 功能

## 功能描述
CV (履歷) 功能是一個互動式履歷組件，提供使用者的專業背景、經驗和技能的詳細資訊。該功能支援多語言切換，能夠根據不同語言顯示對應的履歷內容。

## 核心組件
- **CV**: 主要顯示整體履歷內容的組件
- **LanguageSwitcher**: 多語系切換組件，允許用戶在不同語言版本間切換
- **useCV**: 自定義Hook，用於獲取和處理CV相關資料

## 特色功能
- 互動式工作經驗展示，可展開/收起詳細內容
- 技能分類與圖標視覺化展示
- 工作經驗自動計算時間長度
- 相同公司的不同職位自動分組顯示
- 強調個人專業亮點的區域
- 支援多語系顯示
- 響應式設計，適應不同螢幕尺寸

## 檔案結構
```
cv/
├── README.md               # 功能說明文件
├── components/
│   └── CV.tsx              # CV 主要組件
├── hooks/
│   └── useCV.ts            # 取得 CV 資料的鉤子
├── styles/
│   ├── CV.css              # 主要樣式
│   ├── company-duration.css # 公司時間相關樣式
│   ├── experience-details.css # 經驗詳細內容樣式
│   ├── highlights.css      # 亮點部分樣式
│   ├── skills-display.css  # 技能展示樣式
│   └── section-controls.css # 區塊控制相關樣式
└── types/
    └── index.ts            # CV 資料的型別定義
```

## 使用方式

### 基本使用

將 `CV` 組件導入並放置在您的頁面中：

```jsx
import CV from 'features/cv/components/CV';

const MyPage = () => {
  return <CV />;
};
```

### 資料結構

CV 組件透過 `useCV` 鉤子獲得以下資料結構：

```typescript
interface CVData {
  name: string;
  title: string;
  summary: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  sections: {
    skills: string;
    experience: string;
    education: string;
    conferences?: string;
  };
  experiences: Array<{
    company: string;
    companyNote?: string;
    position: string;
    period: string;
    brief?: string[];
    details?: string[];
    description?: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    major: string;
    period: string;
    description?: string[];
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  conferences?: Array<{
    title: string;
    date: string;
    venue?: string;
    organizer?: string;
    tags?: string[];
    url?: string;
  }>;
}
```

## 注意事項

- 確保 FontAwesome 圖標已正確導入，以顯示技能圖標
- 若需調整顯示樣式，請修改對應的 CSS 文件
- 使用 i18n 配置來支援多語言功能

## 技能顯示設計

技能區塊採用現代化卡片設計，具有以下特點：

1. 使用 `skills-display.css` 中的專用樣式以避免與其他元素產生衝突
2. 每個技能以圖標 + 文字的形式呈現，避免了原本圖標與列表樣式的視覺衝突
3. 圖標使用統一的圓形背景容器，並在懸停時有色彩變化和旋轉動畫
4. 卡片設計包含微妙的背景裝飾和層次感，增加了視覺深度
5. 使用漸入動畫和交錯延遲，營造出流暢的載入體驗
6. 自適應設計確保在各種螢幕尺寸上都能良好顯示
