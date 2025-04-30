# CV Feature

## Description
The CV (Curriculum Vitae) feature displays a comprehensive professional profile, including work experiences, education background, skills, and conference presentations. It provides an interactive and detailed view of professional qualifications, with expandable sections for detailed information.

## Functionality
- **Work Experience**: Shows professional history with company details, positions, responsibilities, and achievements
- **Education**: Displays academic background with degree, major, and relevant projects
- **Skills**: Lists technical, security, and management capabilities categorized by domain
- **Conferences**: Presents speaking engagements, with details about venues, organizers, and topics
- **Interactive UI**: Includes expandable/collapsible sections for detailed information
- **Internationalization**: Fully supports multiple languages (English and Traditional Chinese)

## Components
1. **CV.tsx**: Main component that renders the entire CV section
   - Handles the display of all CV sections (experiences, education, skills, conferences)
   - Manages interactive elements like expanding/collapsing sections
   - Formats time periods and calculates experience durations

2. **useCV.ts**: Custom hook that provides CV data and translation functionality
   - Fetches data from i18n translation files
   - Handles language switching and provides functions for formatted text

## Data Structure
The CV data follows this structure:
```typescript
interface CVData {
  name: string;
  title: string;
  summary: string;
  sections: {
    skills: string;
    experience: string;
    education: string;
    conferences: string;
  };
  skills: Array<{
    category: string;
    items: string[];
  }>;
  experiences: Array<{
    company: string;
    companyNote?: string;
    position: string;
    period: string;
    description: string[];
    brief: string[];
    details: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    period: string;
    major: string;
    description?: string[];
  }>;
  conferences: Array<{
    title: string;
    date: string;
    venue?: string;
    organizer?: string;
    tags?: string[];
    url?: string;
  }>;
}
```

## Usage
Import and include the CV component in your page layout:
```tsx
import CV from '../features/cv/components/CV';

const CVPage = () => {
  return (
    <div className="cv-page">
      <CV />
    </div>
  );
};

export default CVPage;
```

## Styling
The CV feature includes several CSS files for styling different sections:
- **CV.css**: Main styling for the CV layout and container
- **experience-details.css**: Styles for work experience sections
- **section-controls.css**: Styles for expand/collapse controls
- **company-duration.css**: Styling for company information and duration display
