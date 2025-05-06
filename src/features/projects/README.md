# Projects Feature

## Description
The Projects feature showcases the user's portfolio of projects in an organized, visually appealing gallery. It allows visitors to browse projects, filter by category, and view detailed information about each project.

## Core Components
- **ProjectsList**: Main component for displaying the project gallery
- **ProjectCard**: Component for showing project previews in the gallery
- **ProjectDetail**: Component for displaying detailed project information
- **ProjectFilter**: Component for filtering projects by category or technology

## Features
- Responsive grid layout for project display
- Filtering capabilities by technology, category, or time period
- Detailed project views with descriptions, technologies, and images
- Project search functionality
- Pagination or infinite scroll for large project collections
- Image gallery for project screenshots
- External links to live demos and repositories
- Multilingual support through i18n integration

## File Structure
```
features/
└── projects/
    ├── index.ts                - Exports the main Projects components
    ├── components/             - React components for the projects feature
    │   ├── ProjectsList.tsx    - Main gallery component
    │   ├── ProjectCard.tsx     - Project preview component
    │   ├── ProjectDetail.tsx   - Detailed project view component
    │   ├── ProjectFilter.tsx   - Filtering component
    │   └── ...                 - Other supporting components
    ├── data/                   - Project data (if not fetched from API)
    │   └── projects.ts         - Project data structure
    ├── hooks/                  - Custom hooks for project functionality
    │   └── useProjects.ts      - Hook for project data handling
    ├── styles/                 - CSS styles for project components
    │   ├── Projects.css        - Styles for project components
    │   └── ProjectDetail.css   - Styles for detailed project view
    └── types/                  - TypeScript type definitions
        └── project.types.ts    - Types for project data
```

## Usage
Import the components from the projects feature:

```tsx
import { ProjectsList, ProjectDetail } from '../features/projects';

// For projects list/gallery view
const ProjectsPage = () => {
  return (
    <section>
      <h1>My Projects</h1>
      <ProjectsList category="web" />
    </section>
  );
};

// For detailed project view
const SingleProjectPage = ({ projectId }) => {
  return <ProjectDetail id={projectId} />;
};
```

## Configuration
The ProjectsList component accepts several props for customization:

- `category`: Filter projects by category
- `technology`: Filter projects by technology used
- `limit`: Limit the number of displayed projects
- `featured`: Boolean to show only featured projects
