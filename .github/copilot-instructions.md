
1. React 專案以feature-based 方式組織，請參考 ## 專案結構
2. 網站設計與顏色採用一致的風格，並遵循設計規範。
3. 專案結構應該清晰易懂，並遵循最佳實踐。
4. 遵循 ##實施步驟 中的步驟來實現多語系支援。
5. 遵循 ##最佳實踐 中的建議來確保資料一致性和可維護性。
6. 若美化設計時，可以透過 playwright 開始browser 來進行測試，確保網站在不同語言下的顯示效果。但是結束後要記得關閉 browser，避免影響其他測試。


## 專案結構
在 feature-based 架構中，我們將多語系相關檔案組織如下：

    features/
    └── featureName/
        ├── README.md                 # 功能說明文件
        ├── index.ts                  # 匯出功能主要組件
        ├── components/               # 組件目錄
        │   ├── FeatureComponent.tsx  # 顯示相關組件
        │   └── ...
        ├── hooks/                    # 自定義鉤子
        │   ├── useFeatureData.ts     # 處理特性資料的鉤子
        │   └── ...
        ├── data/                     # 多語系資料存放處
        │   ├── en.json               # 英文資料
        │   ├── zh-TW.json            # 繁體中文資料
        │   └── ...                   # 其他語言
        ├── types/                    # TypeScript 類型定義
        │   └── index.ts              # 資料類型定義
        └── styles/                   # 樣式文件
            └── FeatureComponent.css  # 組件樣式

## 實施步驟
1. 建立資料檔案
在每個功能的 data/ 目錄中，為每種語言建立單獨的資料檔案：
    ### Example: Data Files for Each Language

    - **English (`en.json`)**

        ```json
        {
          "certificates": [
            {
              "id": "cert-1",
              "title": "Ethical Hacking",
              "category": "Cyber Security",
              "description": "Certification details in English..."
              // other fields...
            }
          ]
        }
        ```

    - **Traditional Chinese (`zh-TW.json`)**

        ```json
        {
          "certificates": [
            {
              "id": "cert-1",
              "title": "道德駭客",
              "category": "網路安全",
              "description": "證照詳細資訊..."
              // 其他欄位...
            }
          ]
        }
        ```

2. 建立資料處理鉤子

建立一個自定義鉤子來載入當前語言的資料：

    import { useTranslation } from 'react-i18next';
    import { useState, useEffect } from 'react';
    import { Certificate } from '../types';

    export const useCertificates = () => {
    const { i18n } = useTranslation();
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadCertificates = async () => {
        setLoading(true);
        try {
            // 根據當前語言動態載入資料
            const lang = i18n.language || 'en';
            const data = await import(`../data/${lang}.json`);
            setCertificates(data.certificates);
        } catch (error) {
            console.error('Error loading certificates:', error);
            // 如果特定語言資料載入失敗，嘗試載入英文資料作為後備
            const fallbackData = await import(`../data/en.json`);
            setCertificates(fallbackData.certificates);
        } finally {
            setLoading(false);
        }
        };
        
        loadCertificates();
    }, [i18n.language]); // 當語言變更時重新載入資料
    
    return { certificates, loading };
    };

3. UI 文字與標籤翻譯
對於 UI 元素的翻譯（如標題、按鈕等），使用統一的翻譯檔案：

    {
        "certificates": {
            "title": "Professional Certifications",
            "filterByCategory": "Filter by Category",
            "allCategories": "All Categories",
            "obtainedAt": "Obtained at",
            "expiryDate": "Expiry Date"
        }
    }

4. 在組件中使用多語系資料

    import { useTranslation } from 'react-i18next';
    import { useCertificates } from '../hooks/useCertificates';
    import Certificate from './Certificate';

    const CertificateList = () => {
    const { t } = useTranslation();
    const { certificates, loading } = useCertificates();
    
    if (loading) return <div>Loading...</div>;
    
    return (
        <div className="certificate-list">
        <h2>{t('certificates.title')}</h2>
        <div className="filters">
            <span>{t('certificates.filterByCategory')}</span>
            {/* 過濾器實作 */}
        </div>
        <div className="certificates-grid">
            {certificates.map(cert => (
            <Certificate key={cert.id} certificate={cert} />
            ))}
        </div>
        </div>
    );
    };

    export default CertificateList;

5. 確保一致的資料架構
為了維護資料一致性，定義清晰的型別：

    export interface Certificate {
        id: string;
        title: string;
        category: string;
        institution: string;
        image: string;
        description: string;
        fullName: string;
        abbreviation: string;
        obtainedAt: string;
        expiryDate: string;
        value: number;
    }


## 最佳實踐
    1. 保持 ID 一致：所有語言版本中，同一資料項目的 ID 必須保持一致

    2. 區分資料和 UI 文字：
        * 資料存放在各功能的 data/ 目錄
        * UI 文字存放在全局 i18n 資源目錄
    3. 避免硬編碼文字：所有顯示文字都應透過翻譯函數獲取
    4. 處理特殊字元：確保所有語言的特殊字元都能正確顯示
    5. 維護資料對應：添加新資料時，確保所有支持的語言中都添加對應條目
    6. 命名規範：
        * 資料檔案：使用語言代碼命名（如 en.json, zh-TW.json）
        * 翻譯檔案：按功能或模塊分類（如 common.json, certificates.json）
    7. 語言切換：實現語言切換功能，並保持用戶的語言選擇
    8. 後備機制：當特定語言資料不可用時，使用默認語言（通常是英文）作為後備

## 文件更新流程
    1. 添加新功能時，同時在所有語言版本中添加相應的資料檔案
    2. 更新現有功能時，確保更新所有語言版本的資料
    3. 在 README.md 中記錄資料結構和翻譯要求

遵循此指南，您的專案將能夠順利支援多種語言，同時保持程式碼的可維護性和擴展性。