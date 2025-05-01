# Apps Feature

## Description
The Apps feature showcases a collection of applications developed by the user, presented in an organized and visually appealing interface. It supports multiple languages through the i18n system.

## Core Components
- **AppList**: Main component that displays a grid or list of applications
- **AppCard**: Card component showing app preview, title, and brief description
- **AppDetail**: Detailed view of a selected application

## Features
- Responsive grid layout for app display
- Filtering capabilities by technology or category
- Detailed view for each application with screenshots and technical details
- Multilingual support through i18n integration

## File Structure
```
features/
└── apps/
    ├── index.ts        - Exports the main Apps components
    ├── components/     - React components for the Apps feature
    │   ├── AppList.tsx - Main component for displaying apps
    │   ├── AppCard.tsx - Card component for individual apps
    │   └── ...         - Other supporting components
    └── styles/         - CSS styles for the Apps feature
        └── Apps.css    - Styles for Apps components
```

## Usage
Import the components from the apps feature:

```tsx
import { AppList, AppCard } from '../features/apps';

const MyPage = () => {
  return (
    <div>
      <AppList />
      {/* Or with custom props */}
      <AppList filter="mobile" />
    </div>
  );
};
```
