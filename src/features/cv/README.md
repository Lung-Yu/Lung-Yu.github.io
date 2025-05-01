# CV Feature

## 功能說明 (Feature Description)

CV (履歷) 功能是一個互動式履歷組件，提供使用者的專業背景、經驗和技能的詳細資訊。該功能支援多語言切換，能夠根據不同語言顯示對應的履歷內容。

## 使用方式 (Usage)

### 基本使用

將 `CV` 組件導入並放置在您的頁面中：

```jsx
import CV from 'features/cv/components/CV';

const MyPage = () => {
  return <CV />;
};
```

### 功能特點

1. **多語言支援**：透過內建的 `LanguageSwitcher` 組件可在不同語言版本之間切換
2. **經驗時間計算**：自動計算每段工作經驗的時間長度
3. **可展開/收起詳細資訊**：工作經驗和教育經歷的詳細內容可展開查看
4. **按公司分組**：相同公司的不同職位會被分組顯示，並計算在該公司的總工作時間

### 資料結構

CV 組件期望從 `useCV` 鉤子獲得以下資料結構：

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
    organizer?: string;
    date: string;
    venue?: string;
    url?: string;
    tags?: string[];
  }>;
}
```

## 檔案結構 (File Structure)

```
cv/
├── README.md               # 功能說明文件
├── components/
│   └── CV.tsx              # CV 主要組件
├── hooks/
│   └── useCV.ts            # 取得 CV 資料的鉤子
└── styles/
    ├── CV.css              # 主要樣式
    ├── company-duration.css # 公司時間相關樣式
    ├── experience-details.css # 經驗詳細內容樣式
    ├── highlights.css      # 亮點部分樣式
    └── section-controls.css # 區塊控制相關樣式
```

## 注意事項 (Notes)

- 確保 FontAwesome 圖標已正確導入，以顯示技能圖標
- 若需調整顯示樣式，請修改對應的 CSS 文件
- 使用 i18n 配置來支援多語言功能

## 技能顯示設計 (Skills Display Design)

技能區塊採用現代化卡片設計，具有以下特點：

1. 使用 `skills-display.css` 中的專用樣式以避免與其他元素產生衝突
2. 每個技能以圖標 + 文字的形式呈現，避免了原本圖標與列表樣式的視覺衝突
3. 圖標使用統一的圓形背景容器，並在懸停時有色彩變化和旋轉動畫
4. 卡片設計包含微妙的背景裝飾和層次感，增加了視覺深度
5. 使用漸入動畫和交錯延遲，營造出流暢的載入體驗
6. 自適應設計確保在各種螢幕尺寸上都能良好顯示
