# CV 功能

## 功能描述
CV (履歷) 功能是一個互動式履歷組件，提供使用者的專業背景、經驗和技能的詳細資訊。該功能支援多語言切換，能夠根據不同語言顯示對應的履歷內容。

## 核心組件
- **CV**: 主要顯示整體履歷內容的組件
- **LanguageSwitcher**: 多語系切換組件，允許用戶在不同語言版本間切換
- **useCV**: 自定義Hook，用於獲取和處理CV相關資料

## 特色功能
- 互動式工作經驗展示，可展開/收起詳細內容
- 技能分類以精簡方式呈現核心專業能力
- 工作經驗自動計算時間長度
- 相同公司的不同職位自動分組顯示
- 強調個人專業亮點的區域
- 精選證書區塊展示，整合最重要的專業認證
- 演講/議程按年份分組摺疊顯示，降低視覺負擔
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
│   ├── section-controls.css # 區塊控制相關樣式
│   ├── certificates-summary.css # 證書摘要樣式
│   └── conferences-accordion.css # 演講摺疊式列表樣式
└── types/
    └── index.ts            # CV 資料的型別定義
```

## Skills 內容設計

技能部分採用了精簡化設計，將原本較長的技能清單濃縮為每個類別的核心能力，使頁面更加清晰易讀：

1. **資安技能/Cybersecurity Skills**：聚焦於資安分析、滲透測試、安全開發生命週期和法規遵循四大核心能力
2. **開發技能/Development Skills**：突出前端與後端開發能力、系統架構設計和自動化部署流程
3. **管理技能/Management Skills**：強調專案管理、團隊領導、跨部門溝通和技術培訓

## 證書整合設計

為了優化用戶體驗，CV頁面整合了個人證書的摘要展示：

1. **精選展示**：從certificates功能模組中選取價值最高的4個專業證書進行展示
2. **視覺化呈現**：每個證書以卡片形式呈現，包含證書圖片、名稱、機構和有效期間
3. **簡潔佈局**：使用網格佈局確保證書區域在各種螢幕尺寸下都能完整顯示
4. **互動效果**：證書卡片添加了輕微的懸停效果，提高用戶體驗

這種整合設計避免用戶需要在不同頁面間切換以查看重要證書資訊，提高了履歷頁面的完整性和資訊密度。

這種精簡設計有助於讓訪問者快速獲取關鍵資訊，提高頁面的易讀性和專業性，符合現代履歷設計趨勢。

## 演講/議程區塊設計
演講/議程區塊採用摺疊式列表設計，將內容按年份分組並提供摺疊/展開功能，主要特色：

1. **年份分組**：所有演講內容按照年份進行分類，讓使用者更容易找到特定時間段的演講紀錄
2. **預設展開最新年份**：系統自動展開最新年份的演講內容，其他年份預設為摺疊狀態
3. **一致的控制介面**：與工作經驗和學歷區塊使用相同的展開/收合控制按鈕，提供一致的使用體驗
4. **全局控制**：提供「展開全部」和「收合全部」按鈕，方便一次性控制所有年份區塊
5. **精簡信息呈現**：每個演講項目以列表形式呈現，包含：
   - 演講標題和外部連結（如有）
   - 日期
   - 主辦單位
   - 地點（如有）
   - 相關標籤
6. **響應式設計**：在不同螢幕尺寸下自動調整布局，確保良好的可讀性
7. **資料維護**：演講資料可透過編輯 `src/i18n/locales/[語言]/cv.json` 中的 `conferences` 陣列來更新。演講項目會自動根據日期分組顯示。

這種摺疊式設計大幅減少了頁面垂直空間的使用，讓使用者在瀏覽大量演講紀錄時更加便捷，同時又保留了所有重要信息。設計上與CV其他區塊保持一致性，提升整體使用體驗。

### 資料更新記錄
- 2023/11/30: 移除尚未確定的「雲原生安全：Kubernetes 漏洞與緩解策略」演講項目

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
