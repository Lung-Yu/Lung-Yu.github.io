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
    ├── README.md               - Documentation for the projects feature
    ├── index.ts                - Exports the main Projects components
    ├── components/             - React components for the projects feature
    │   ├── ProjectList.tsx     - Main gallery component
    │   ├── ProjectDetail.tsx   - Detailed project view component
    │   └── ...                 - Other supporting components
    ├── data/                   - Multilingual data for projects
    │   ├── en.json             - English project data
    │   └── zh-TW.json          - Traditional Chinese project data
    ├── hooks/                  - Custom hooks for project functionality
    │   └── useProjects.ts      - Hook for projects data handling
    ├── styles/                 - CSS styles for project components
    │   ├── Projects.css        - Styles for project components
    │   └── ProjectDetail.css   - Styles for detailed project view
    └── types/                  - TypeScript type definitions
        └── index.ts            - Types for project data
```

## Multilingual Data Structure

This feature follows the feature-based architecture pattern for internationalization. Instead of using global i18n files for all data, each feature contains its own data directory with language-specific JSON files:

- `data/en.json` - Contains project data in English
- `data/zh-TW.json` - Contains project data in Traditional Chinese

UI texts (like buttons, section titles, etc.) remain in the global i18n resources.

### Data Structure

Each language file follows this structure:

```json
{
  "projects": [
    {
      "id": 1,
      "title": "Project Title",
      "description": "Project description...",
      "image": "/images/projects/path/main.jpg",
      "tags": ["Tag1", "Tag2", "Tag3"],
      "github": "https://github.com/username/repo",
      "demo": "https://demo-link.com",
      "detailPath": "project-path",
      "gallery": [
        "/images/projects/path/image1.jpg",
        "/images/projects/path/image2.jpg"
      ],
      "videos": [
        "/videos/project-video.mp4"
      ],
      "startDate": "YYYY-MM-DD",
      "endDate": "YYYY-MM-DD",
      "featured": true,
      "archived": false,
      "type": "webApp",
      "highlights": [
        {
          "title": "Highlight Title",
          "description": "Feature description",
          "icon": "icon-name"
        }
      ],
      "features": [
        "Feature 1 description",
        "Feature 2 description"
      ],
      "demoSteps": [
        {
          "title": "Step 1",
          "description": "Step description",
          "image": "/images/projects/path/step1.jpg"
        }
      ],
      "installation": {
        "steps": [
          "Step 1 instruction",
          "Step 2 instruction"
        ]
      },
      "configuration": {
        "section1": {
          "key1": "value1",
          "key2": "value2"
        }
      }
    }
  ]
}
```

#### Required Fields
- `id`: Unique identifier for the project
- `title`: Project title
- `description`: Brief project description
- `image`: Main project image URL
- `tags`: Array of technology/skill tags
- `detailPath`: URL path for project detail page
- `startDate`: Project start date
- `endDate`: Project end date
- `type`: Project type (webApp, security, automation, etc.)

#### Optional Fields
- `github`: GitHub repository URL
- `demo`: Live demo URL
- `gallery`: Array of additional project images
- `videos`: Array of project video URLs
- `featured`: Boolean to mark project as featured
- `archived`: Boolean to mark project as archived
- `highlights`: Array of key project highlights with icons
- `features`: Array of project features as strings
- `demoSteps`: Array of demonstration steps with images
- `installation`: Object with installation instructions
- `configuration`: Nested object with configuration examples

## Data Loading

The `useProjects` hook handles dynamically loading data based on the current language setting:

```tsx
const { projects, loading } = useProjects();
```

The hook:
1. Detects the current language from i18n
2. Dynamically imports the corresponding data file (e.g., `en.json` or `zh-TW.json`)
3. Falls back to English if the current language data is not available
4. Returns:
   - `projects`: Array of project data, sorted by date
   - `loading`: Boolean indicating if data is being loaded

## Usage
Import the components from the projects feature:

```tsx
import { ProjectList, ProjectDetail } from '../features/projects';

// For projects list/gallery view
const ProjectsPage = () => {
  return (
    <section>
      <h1>{t('projects.title')}</h1>
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
The ProjectList component accepts several props for customization:

- `category`: Filter projects by category
- `technology`: Filter projects by technology used
- `limit`: Limit the number of displayed projects
- `featured`: Boolean to show only featured projects

## Best Practices for Maintenance

### When adding or updating project data:

1. **Consistency Across Languages**: Always update all language files when adding or modifying projects
   ```
   data/en.json
   data/zh-TW.json
   ```

2. **ID Consistency**: Keep the same IDs and detailPath values across all language versions
   ```json
   // en.json
   { "id": 1, "detailPath": "project-name" }
   
   // zh-TW.json
   { "id": 1, "detailPath": "project-name" }
   ```

3. **Field Requirements**: Ensure all required fields are present in each language version

4. **Testing with Languages**: Test the feature with different language settings to verify correct loading

5. **Consistent Structure**: Maintain the same structure for all projects, including consistent field names

6. **Date Accuracy**: Provide accurate dates for proper chronological sorting

7. **Image Optimization**: Optimize image sizes for better performance
   - Recommended dimensions: 1200x800px for main images
   - Compressed formats: JPG for photos, PNG for UI screenshots, WebP when possible

8. **Link Verification**: Ensure all external links (GitHub, demo) are valid and working

### Adding a New Project:

1. **Prepare Images**: Optimize and place project images in the appropriate directory:
   ```
   /public/images/projects/[project-folder]/
   ```

2. **Add to Language Files**: Add the project data to both language files:
   ```json
   // en.json
   {
     "projects": [
       // existing projects
       {
         "id": 10,
         "title": "New Project",
         // other fields
       }
     ]
   }
   
   // zh-TW.json
   {
     "projects": [
       // existing projects
       {
         "id": 10,
         "title": "新項目",
         // other fields
       }
     ]
   }
   ```

3. **Update UI Texts**: If needed, add project-specific UI texts to the global i18n files:
   ```json
   // i18n/locales/en/projects.json
   {
     "projectName": {
       "button": "View Details"
     }
   }
   
   // i18n/locales/zh-TW/projects.json
   {
     "projectName": {
       "button": "查看詳情"
     }
   }
   ```

4. **Test Rendering**: Verify the project appears correctly in both languages and all filters work as expected
