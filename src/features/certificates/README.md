# 證照 (Certificates) 功能

## 描述
證照功能用於展示個人專業認證和證書，提供訪問者了解您在不同領域的資格認證，特別是網路安全相關證照。此功能允許用戶按類別進行篩選，並以視覺化方式呈現重要證書資訊。

## 核心組件
- **CertificateList**: 顯示證照列表，並提供分類過濾功能
- **CertificateModal**: 顯示證照詳細資訊的彈出視窗組件

## 特色功能
- 分類過濾系統，按證照類型分類瀏覽
- 可視化呈現，包含證照徽章和圖像
- 證照有效期限自動化顯示
- 頒發機構和認證資訊展示
- 證照價值評分系統，標示重要性
- 完整的i18n多語系支援，遵循feature-based架構

## 檔案結構
```
features/
└── certificates/
    ├── README.md               - 功能文件說明
    ├── index.ts                - 匯出主要證照組件
    ├── components/             - React 組件
    │   ├── CertificateList.tsx - 證照列表組件
    │   └── CertificateModal.tsx - 證照詳細彈出視窗
    ├── hooks/                  - 自定義鉤子
    │   └── useCertificates.ts  - 證照資料處理鉤子
    ├── styles/                 - CSS 樣式
    │   ├── Certificates.css    - 列表樣式
    │   └── CertificateModal.css - 彈出視窗樣式
    ├── data/                   - 多語系證照資料
    │   ├── en.json             - 英文證照資料
    │   └── zh-TW.json          - 繁體中文證照資料
    └── types/                  - TypeScript 類型定義
        └── index.ts            - 證照資料類型
```

## i18n 實現
本功能完整支援多語系，按照feature-based架構組織：

### 多語系資料 (Data)
證照資料存儲在每個功能的 data/ 目錄中：

- `src/features/certificates/data/en.json` (英文)
- `src/features/certificates/data/zh-TW.json` (繁體中文)

每個證照對象包含以下多語系欄位:
- id: 唯一識別符（保持一致，不翻譯）
- title: 證照標題
- category: 證照類別
- description: 證照描述
- fullName: 完整名稱
- institution: 機構名稱
- abbreviation: 縮寫（通常不翻譯）
- obtainedAt: 取得日期（ISO格式）
- expiryDate: 到期日期（ISO格式）
- value: 重要性值（用於排序）

### UI文字 (UI Text)
UI介面標籤和文字存儲在全局i18n資源目錄：
- `/src/i18n/locales/en/certificates.json` (英文)
- `/src/i18n/locales/zh-TW/certificates.json` (繁體中文)

### 資料處理鉤子 (Hook)
自定義鉤子 `useCertificates.ts` 處理多語系資料載入與處理：

```ts
export const useCertificates = () => {
  const { i18n } = useTranslation('certificates');
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCertificates = async () => {
      setLoading(true);
      try {
        // 根據當前語言動態載入資料
        let lang = i18n.language || 'en';
        if (lang.startsWith('zh')) {
          lang = 'zh-TW';
        } else {
          lang = 'en';
        }
        
        const data = await import(`../data/${lang}.json`);
        
        // 處理資料，添加額外屬性
        const processedCertificates = data.certificates.map(cert => ({
          ...cert,
          id: cert.id || generateCertificateId(cert),
          categoryKey: getCategoryKey(cert.category)
        }));
        
        // 依照重要性和日期排序
        setCertificates(processedCertificates.sort((a, b) => {
          if (b.value === a.value) {
            return new Date(b.obtainedAt).getTime() - new Date(a.obtainedAt).getTime();
          }
          return b.value - a.value;
        }));
      } catch (error) {
        // 載入失敗時，嘗試載入英文資料作為後備
        const fallbackData = await import(`../data/en.json`);
        // 處理後備資料...
      } finally {
        setLoading(false);
      }
    };
    
    loadCertificates();
  }, [i18n.language]); // 當語言變更時重新載入
  
  // 返回處理後的資料與相關狀態
  return {
    certificates,
    categories,
    categoryToKeyMap,
    loading
  };
};
```

## 使用方式
在需要顯示證照的頁面中引入相關組件:

```tsx
import { CertificateList } from '../features/certificates';

const CertificatesPage = () => {
  return (
    <section>
      <h1>專業證照</h1>
      <CertificateList />
    </section>
  );
};
```

### 組件中使用多語系

CertificateList.tsx 組件中使用翻譯函數展示UI文字：

```tsx
const CertificateList = () => {
  const { t, i18n } = useTranslation('certificates');
  const { certificates, categories, loading } = useCertificates();
  
  return (
    <section className="certificates">
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      
      {loading ? (
        <div className="loading">{t('loading')}</div>
      ) : (
        <>
          <div className="categories">
            {categories.map(category => {
              const categoryKey = getCategoryKey(category);
              const translatedCategory = t(`categories.${categoryKey}`, category);
              
              return (
                <button>
                  {translatedCategory}
                </button>
              );
            })}
          </div>
          
          <div className="gallery">
            {certificates.map(certificate => (
              <div className="certificate">
                <h3>{certificate.title}</h3>
                <p>{certificate.institution}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
```

### 多語系最佳實踐

- 保持資料 ID 一致：所有語言版本中，同一證照的 ID 必須一致
- 區分資料與 UI 文字：資料存放在 data/ 目錄，UI 文字存放在全局 i18n 資源中
- 避免硬編碼：所有顯示文字都通過翻譯函數獲取
- 維護資料對應：添加新證照時，確保所有語言中都添加對應條目
- 命名規範：使用語言代碼命名資料檔案（如 en.json, zh-TW.json）

## 添加新證照流程

當需要添加新的專業證照時，請按照以下流程：

1. 為每種支持的語言添加證照資訊：

```json
// 英文版本 - en.json
{
  "certificates": [
    {
      "id": "new-cert-id",
      "title": "New Certification Title",
      "category": "Cyber Security",
      "institution": "Issuing Organization",
      "image": "/images/certifications/org/cert-image.jpg",
      "description": "Detailed description of the certification in English...",
      "fullName": "Complete Official Name of Certification",
      "abbreviation": "NCT",
      "obtainedAt": "2024-01-15",
      "expiryDate": "2027-01-15",
      "value": 8
    },
    // ...existing certificates
  ]
}

// 繁體中文版本 - zh-TW.json
{
  "certificates": [
    {
      "id": "new-cert-id",  // 保持ID一致
      "title": "新證照中文標題",
      "category": "網路安全",
      "institution": "發證機構",
      "image": "/images/certifications/org/cert-image.jpg",  // 圖片路徑通常保持一致
      "description": "證照的中文詳細描述...",
      "fullName": "證照的完整官方名稱（中文）",
      "abbreviation": "NCT",  // 縮寫通常不翻譯
      "obtainedAt": "2024-01-15",
      "expiryDate": "2027-01-15",
      "value": 8  // 重要性值保持一致
    },
    // ...既有證照
  ]
}
```

2. 若新證照屬於新類別，確保在UI翻譯檔案中添加對應的類別翻譯：

```json
// src/i18n/locales/en/certificates.json
{
  "categories": {
    "all": "All Categories",
    "cyber-security": "Cyber Security",
    "new-category": "New Category"  // 添加新類別
  }
}

// src/i18n/locales/zh-TW/certificates.json
{
  "categories": {
    "all": "全部類別",
    "cyber-security": "網路安全",
    "new-category": "新類別名稱"  // 添加對應中文翻譯
  }
}
```

3. 確保新證照的圖片放置在正確的目錄中：
   - `/public/images/certifications/<organization>/<image-file>`

按照此流程，確保所有語言版本中資料結構一致，保持良好的多語系支援。
- 顯示證照縮略圖和機構名稱
- 點擊證照顯示詳細資訊彈出視窗
- 支持響應式佈局，適應各種螢幕尺寸

## 資料模型
證照資料模型包含:
```typescript
interface Certificate {
  id: string;          // 唯一識別碼
  title: string;       // 證照標題
  category: string;    // 證照類別
  institution: string; // 頒發機構
  image: string;       // 證照圖片路徑
  description: string; // 證照描述
  fullName: string;    // 證照完整名稱
  abbreviation: string; // 證照縮寫
  obtainedAt: string;  // 取得日期
  expiryDate: string;  // 到期日期
  value: number;       // 重要性評分
}
```

## i18n 實現詳情

本證照功能使用react-i18next實現多語系支援:

1. **多語系資料載入**
   - 使用 `useCertificates` 鉤子載入對應語言的證照資料
   - 會根據當前選擇的語言動態載入相應語言的JSON檔案
   - 提供後備機制，當找不到特定語言資料時會自動使用英文

2. **資料檔案結構**
   - 每個語言版本的資料檔案包含完整的證照資訊
   - 所有語言版本中的證照ID必須保持一致
   - 資料包括證照資訊和類別名稱映射

3. **類別過濾系統**
   - 動態生成證照類別列表用於過濾
   - 自動根據當前語言調整類別顯示名稱
   - 確保跨語言切換時過濾功能保持一致

4. **無縫語言切換**
   - 當用戶切換語言時，組件會自動重新載入對應語言資料
   - 保持用戶當前選擇的過濾類別和視圖狀態

## 維護說明
要新增或更新證照:

1. 分別在英文和中文的JSON檔案中新增/更新證照資料
2. 確保所有必要欄位都填寫完整
3. 確保證照ID在所有語言版本中保持一致
4. 將證照圖片新增至public/images/certifications/路徑下
5. 若有新的證照類別，需同時在兩個語言檔案中更新類別對照表

## 最佳實踐

- **保持ID一致性**: 所有語言資料中證照的ID必須保持一致
- **資料完整性**: 確保每個證照在所有語言版本中都有完整資訊
- **圖片優化**: 確保證照圖片已優化並存放在正確位置
- **語言測試**: 在新增證照後測試不同語言的顯示效果
- **可維護性**: 在更改證照資料結構時更新型別定義
   - ALT text for images is translated for each language

## Usage
Import the components from the certificates feature:

```tsx
import { CertificateList } from '../features/certificates';

const CertificatesSection = () => {
  return (
    <section id="certificates" className="section-padding scroll-mt-20">
      <CertificateList />
    </section>
  );
};
```

The certificates will be automatically displayed in the user's selected language based on the i18n context.
  );
};
```
