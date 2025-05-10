# Apps Feature

## Description
The Apps feature is the central application structure that includes the main App component responsible for routing and rendering all other features of the portfolio. It serves as the entry point for the application and orchestrates the integration of various features like CV, Projects, Consulting, etc. The feature supports multilingual content display through i18n integration. The design follows an optimized one-page layout approach with efficient spacing and improved information density.

## Core Components
- **App**: Main component that handles routing and application structure
- **HomePage**: Component that renders the landing page with multiple sections
- **ScrollProgressBar**: Visual indicator showing scroll progress through the page
- **SectionIndicator**: Navigation dots for quick access to different sections
- **BackToTopButton**: Button for quickly returning to the top of the page
- **AnimatedSection**: Enhanced section component with intersection observer for scroll-based animations
- **ScrollAnimation**: Component that adds scroll-triggered animations to elements

## Features
- Optimized one-page design layout with efficient spacing and improved information density
- Visual indicators for navigation and scroll position awareness
- Scroll-triggered animations for enhanced user experience
- Intersection Observer-based animations for performance-optimized effects
- Section connectors for visual continuity between content areas
- Centralized routing system for all portfolio pages
- Smooth scrolling to page sections via hash navigation
- Modal system for displaying image previews
- Responsive layout with adaptive design across all device sizes
- Dark mode support with theme variables
- Accessibility features including reduced motion preferences
- Navigation bar integration across routes
- Section-based homepage organization with subtle dividers
- Multilingual support through i18n integration

## File Structure
```
apps/
├── README.md                 # Feature documentation
├── components/               # Feature components
│   ├── App.tsx               # Main application component
│   ├── AnimatedSection.tsx   # Section with animations
│   ├── BackToTopButton.tsx   # Button to scroll to top
│   ├── ScrollAnimation.tsx   # Animation utilities
│   ├── ScrollProgressBar.tsx # Progress indicator
│   └── SectionIndicator.tsx  # Navigation indicators
├── data/                     # Multilanguage data
│   ├── en.json               # English data
│   └── zh-TW.json            # Traditional Chinese data
├── hooks/                    # Custom hooks
│   ├── useAppData.ts         # Hook for loading app data
│   └── index.ts              # Hook exports
├── styles/                   # Component styles
└── types/                    # TypeScript definitions
    └── index.ts              # Types for app data
```

## Multi-language Implementation
The apps feature implements multi-language support following the feature-based architecture guidelines:

1. **Data Organization**:
   - Language-specific data is stored in separate JSON files in the `data/` directory
   - Each language file (`en.json`, `zh-TW.json`) contains structured data for UI elements

2. **Data Loading**:
   - The `useAppData` hook dynamically loads language data based on the current language setting
   - Implements fallback mechanism to load English data if the chosen language data is not available

3. **Component Integration**:
   - Components access translated content via the `useAppData` hook
   - UI elements are rendered with the appropriate language content
   - Components properly handle loading states while language data is being fetched

4. **Type Safety**:
   - Strong typing through TypeScript interfaces ensures data consistency across languages
   - The `AppData` interface defines the structure of language data

## Usage
Import components from the apps feature as needed:

```tsx
import { App, SectionIndicator, BackToTopButton } from '../features/apps';
```

To access multilingual app data:

```tsx
import { useAppData } from '../features/apps';

const MyComponent = () => {
  const { appData, loading } = useAppData();
  
  if (loading) return <div>Loading...</div>;
  
  return <div>{appData.app.sections.home}</div>;
};
```
