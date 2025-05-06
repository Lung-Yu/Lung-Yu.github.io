# Consultant Feature

## Description
The Consultant feature showcases professional consulting services and projects delivered by the user. It provides a structured display of consulting experience, project descriptions, and outcomes to demonstrate expertise to potential clients.

## Core Components
- **ConsultingList**: Main component for displaying a list of consulting projects
- **ConsultingDetail**: Component for showing detailed information about a specific consulting project
- **ConsultingFilter**: Component for filtering consulting projects by industry or technology

## Features
- Organized display of consulting projects and services
- Detailed view of individual consulting engagements
- Client testimonials integration
- Case studies with problem statements and solutions
- Industry and technology-specific filtering
- Multilingual support through i18n integration

## File Structure
```
features/
└── consultant/
    ├── README.md               - Documentation for the consultant feature
    ├── index.ts                - Exports the main Consulting components
    ├── components/             - React components for the consultant feature
    │   ├── ConsultingList.tsx  - Main list component for consulting projects
    │   ├── ConsultingDetail.tsx- Detailed view of consulting projects
    │   └── ...                 - Other supporting components
    ├── data/                   - Multilingual data for consulting projects
    │   ├── en.json             - English data
    │   └── zh-TW.json          - Traditional Chinese data
    ├── hooks/                  - Custom hooks for consultant functionality
    │   └── useConsulting.ts    - Hook for consulting data handling
    ├── styles/                 - CSS styles for consulting components
    │   └── Consulting.css      - Styles for consulting components
    └── types/                  - TypeScript type definitions
        └── index.ts            - Types for consulting data
```

## Multilingual Data Structure

This feature follows the feature-based architecture pattern for internationalization. Instead of using global i18n files for all data, each feature contains its own data directory with language-specific JSON files:

- `data/en.json` - Contains consulting project data in English
- `data/zh-TW.json` - Contains consulting project data in Traditional Chinese

UI texts (like buttons, section titles, etc.) remain in the global i18n resources.

### Data Structure

Each language file follows this structure:

```json
{
  "consulting": [
    {
      "id": 1,
      "title": "Project Title",
      "description": "Project description...",
      "image": "path/to/image.jpg",
      "tags": ["Tag1", "Tag2"],
      "services": ["Service1", "Service2"],
      "detailPath": "project-path",
      "results": ["Result1", "Result2"],
      "gallery": ["path/to/gallery1.jpg", "path/to/gallery2.jpg"]
    }
  ]
}
```

### Usage

Import the components from the consultant feature:

```tsx
import { ConsultingList, ConsultingDetail } from '../features/consultant';

const ConsultingPage = () => {
  return (
    <div>
      <h2>Consulting Services</h2>
      <ConsultingList />
      
      {/* For a specific project detail (via routing) */}
      {/* <ConsultingDetail /> */}
    </div>
  );
};
```

## Data Loading

The `useConsulting` hook handles dynamically loading data based on the current language setting:

```tsx
const { consulting, loading, tags } = useConsulting();
```

The hook:
1. Detects the current language from i18n
2. Dynamically imports the corresponding data file (e.g., `en.json` or `zh-TW.json`)
3. Falls back to English if the current language data is not available
4. Returns:
   - `consulting`: Array of consulting project data
   - `loading`: Boolean indicating if data is being loaded
   - `tags`: Array of unique tags extracted from all projects

## Best Practices for Maintenance

When adding or updating consulting project data:

1. Always update all language files to maintain consistency
2. Keep the same IDs and detailPath values across all language versions
3. Ensure all required fields are present in each language version
4. Test the feature with different language settings to verify correct loading
