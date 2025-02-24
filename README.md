1. 基礎結構

  ```
  src/
  ├── assets/          # 靜態資源
  ├── components/      # 共用元件
  ├── hooks/           # 自定義Hooks
  ├── layouts/         # 頁面布局
  ├── pages/           # 頁面組件
  ├── services/        # API服務
  ├── store/           # 狀態管理
  ├── styles/          # 全局樣式
  ├── types/           # TypeScript類型定義
  ├── utils/           # 工具函數
  └── constants/       # 常量定義
  ```

2. 詳細說明

  📁 **assets/**  
  存放靜態資源，包含圖片、字體、影片等
  ```
  assets/
  ├── images/
  ├── fonts/
  └── videos/
  ```

  📁 **components/**  
  共用元件，建議按功能或領域分類
  ```
  components/
  ├── common/         # 通用元件
  │   ├── Button/
  │   ├── Input/
  │   └── Modal/
  ├── forms/          # 表單相關元件
  └── layout/         # 布局相關元件
  ```

  📁 **pages/**  
  對應路由的頁面組件，可以按功能模組分類
  ```
  pages/
  ├── auth/
  │   ├── Login/
  │   └── Register/
  ├── dashboard/
  └── profile/
  ```

  📁 **services/**  
  API 請求相關
  ```
  services/
  ├── api/
  ├── auth/
  └── http.ts        # axios配置等
  ```

  📁 **store/**  
  狀態管理（Redux/Zustand等）
  ```
  store/
  ├── slices/        # Redux切片
  ├── actions/
  └── reducers/
  ```

## 重要原則

**組件命名規範：**

使用PascalCase命名組件文件，例如：`Button.tsx`, `UserProfile.tsx`

**模組化原則：**

每個組件資料夾可包含：
```
ComponentName/
├── index.tsx          # 主要組件
├── ComponentName.tsx  # 組件實現
├── styles.css         # 樣式（如果需要）
└── types.ts           # TypeScript類型
```

**特性化分類：**

如果專案較大，可以按照特性（features）來組織：
```
src/
└── features/
  ├── auth/
  │   ├── components/
  │   ├── services/
  │   └── hooks/
  └── dashboard/
    ├── components/
    ├── services/
    └── hooks/
```

**存取規範：**

- 避免跨層級引用
- 使用`index.ts`統一導出
- 保持相對路徑簡潔

### 進階建議

**按需加載：**

- 考慮使用動態引入（lazy loading）
- 將大型第三方庫分離

**測試結構：**
```
ComponentName/
├── index.tsx
├── ComponentName.test.tsx   # 測試文件
└── __snapshots__/           # 快照測試
```

### 環境配置：

```
src/
└── config/
  ├── development.ts
  ├── production.ts
  └── index.ts
```