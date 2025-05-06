# Skills Tree Feature

## Description
The Skills Tree feature provides an interactive, hierarchical visualization of the user's skills and competencies. It displays skills in a tree-like structure, showing relationships between different skill sets and allowing visitors to explore the user's knowledge domains.

## Core Components
- **SkillsTree**: Main component that renders the interactive skills tree
- **SkillNodeComponent**: Child component that recursively renders individual skill nodes

## Features
- Interactive tree visualization with expandable/collapsible nodes
- Visual representation of skill relationships and hierarchies
- Color-coded skill proficiency levels
- Responsive design adapting to different screen sizes
- Animation effects for improved user experience
- Multilingual support through feature-based i18n integration

## File Structure
```
skillsTree/
├── README.md             - Documentation for the skills tree feature
├── index.ts              - Exports the main SkillsTree component
├── components/           - React components for the skills tree feature
│   └── SkillsTree.tsx    - Main tree visualization component with embedded SkillNodeComponent
├── data/                 - Multilingual data for skills tree
│   ├── en.json           - English skills tree data
│   └── zh-TW.json        - Traditional Chinese skills tree data
├── hooks/                - Custom hooks for tree functionality
│   └── useSkillsTree.ts  - Hook for loading and managing tree data
├── styles/               - CSS styles for tree components
│   └── SkillsTree.css    - Styles for tree visualization
└── types/                - TypeScript type definitions
    └── index.ts          - Types for skills tree data
```

## Multilingual Data Structure

This feature follows the feature-based architecture pattern for internationalization. Each feature contains its own data directory with language-specific JSON files:

- `data/en.json` - Contains skills tree data in English
- `data/zh-TW.json` - Contains skills tree data in Traditional Chinese

### Data Structure

Each language file follows this hierarchical structure:

```json
{
  "skillTree": {
    "title": "Skills Tree",
    "description": "Hierarchical view of my technical skills",
    "root": {
      "name": "Technical Skills",
      "children": [
        {
          "name": "Information Security",
          "level": "expert",
          "children": [
            {
              "name": "Offensive Security",
              "level": "advanced",
              "children": [
                {"name": "Penetration Testing", "level": "expert"},
                {"name": "Vulnerability Assessment", "level": "expert"}
              ]
            }
          ]
        }
      ]
    }
  }
}
```

## Data Loading

The `useSkillsTree` hook handles dynamically loading data based on the current language setting:

```tsx
const { skillTreeData, loading } = useSkillsTree();
```

The hook:
1. Detects the current language from i18n
2. Dynamically imports the corresponding data file (e.g., `en.json` or `zh-TW.json`)
3. Falls back to English if the current language data is not available
4. Returns:
   - `skillTreeData`: The hierarchical skills data structure
   - `loading`: Boolean indicating if data is being loaded

## Usage

```tsx
import { SkillsTree } from '../features/skillsTree';

const SkillsPage = () => {
  return (
    <section>
      <h1>My Skills</h1>
      <SkillsTree />
    </section>
  );
};
```

## Best Practices for Maintenance

When adding or updating skills tree data:

1. Maintain the same hierarchical structure across all language versions
2. Use consistent skill level terminology: 'basic', 'intermediate', 'advanced', 'expert'
3. Keep node names concise and clear
4. Organize skills in a logical hierarchy
5. Test the tree with different language settings to verify correct rendering
6. Keep the tree depth to a maximum of 3-4 levels for better user experience

## Usage
Import the component from the skillsTree feature:

```tsx
import { SkillsTree } from '../features/skillsTree';

const SkillsPage = () => {
  return (
    <section>
      <h1>My Skills Visualization</h1>
      
      <SkillsTree 
        rootNodeLabel="Technical Skills"
        initialExpanded={true}
        maxDepth={3}
      />
      
      {/* Optional legend */}
      <SkillsLegend />
    </section>
  );
};
```

## Configuration
The SkillsTree component accepts several props for customization:

- `rootNodeLabel`: Text for the root node of the tree
- `initialExpanded`: Boolean to determine if tree starts expanded
- `maxDepth`: Maximum depth of tree branches to show initially
- `highlightDomain`: Specific domain to highlight in the tree
- `layout`: Tree layout direction ('vertical', 'horizontal', 'radial')
- `interactive`: Boolean to enable/disable interactive features
