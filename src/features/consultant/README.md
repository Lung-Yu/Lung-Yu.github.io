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
    ├── index.ts                - Exports the main Consulting components
    ├── components/             - React components for the consultant feature
    │   ├── ConsultingList.tsx  - Main list component for consulting projects
    │   ├── ConsultingDetail.tsx- Detailed view of consulting projects
    │   └── ...                 - Other supporting components
    ├── hooks/                  - Custom hooks for consultant functionality
    │   └── useConsulting.ts    - Hook for consulting data handling
    ├── styles/                 - CSS styles for consulting components
    │   └── Consulting.css      - Styles for consulting components
    └── types/                  - TypeScript type definitions
        └── index.ts            - Types for consulting data
```

## Usage
Import the components from the consultant feature:

```tsx
import { ConsultingList, ConsultingDetail } from '../features/consultant';
import { useConsulting } from '../features/consultant';

const ConsultingPage = () => {
  const { projects } = useConsulting();
  
  return (
    <div>
      <h2>Consulting Services</h2>
      <ConsultingList projects={projects} />
      
      {/* For a specific project detail */}
      <ConsultingDetail projectId="project-1" />
    </div>
  );
};
```
