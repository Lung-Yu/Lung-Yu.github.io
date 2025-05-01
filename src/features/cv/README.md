# CV Feature

## Description
The CV feature provides a comprehensive display of the user's professional experience, skills, certifications, and conference presentations in a responsive layout. It supports both English and Traditional Chinese through the i18n system.

## Core Components
- **CV.tsx**: Main component that renders the entire CV
- **LanguageSwitcher.tsx**: Component for toggling between languages
- **useCVData.ts**: Hook for loading CV data based on the current language

## Features
- Responsive display for all screen sizes
- Interactive experience timeline with expandable job details
- Skills categorized by domain for better organization
- Conference presentations with dates and descriptions
- Bilingual support for English and Traditional Chinese

## File Structure
```
features/
└── cv/
    ├── index.ts        - Exports the main CV component
    ├── components/     - React components
    │   ├── CV.tsx      - Main CV component
    │   └── ...         - Other supporting components
    ├── hooks/          - Custom React hooks
    │   └── useCVData.ts- Hook for loading CV data
    ├── styles/         - CSS styles
    │   └── CV.css      - Styles for CV component
    ├── types/          - TypeScript type definitions
    │   └── cv.types.ts - Types for CV data
    └── README.md       - This documentation
```

## Usage
Import the CV component and include it in your routes:

```jsx
import CV from './features/cv';

// In your router configuration
<Route path="/cv" element={<CV />} />
```

## i18n Support
The CV feature utilizes the i18n system to display content in both English and Traditional Chinese. All text content is stored in translation files and loaded based on the selected language.

## Customization
To customize the CV display:
1. Edit the CSS in the styles folder
2. Modify the data structure in the hooks folder
3. Update the translations in the i18n folder
