# Hero Feature

## Description
The Hero feature provides a prominent, eye-catching introduction section that appears at the top of the portfolio homepage. It showcases key information about the user and creates a strong first impression for visitors.

## Core Components
- **Hero**: Main component that renders the hero section
- **HeroButtons**: Component for rendering call-to-action buttons
- **FloatingOrbs**: Component for displaying animated background effects (imported from floatingOrbs feature)

## Features
- Responsive design that adapts to all device sizes
- Visual appeal with animated floating orbs background
- Grid-based layout for optimal content organization
- Social media links with icon representation
- Profile image display with backdrop effects
- Clear call-to-action buttons for site navigation
- Comprehensive i18n support with:
  - Translated greeting and role text
  - Internationalized descriptions
  - Proper ARIA labels for accessibility in multiple languages
  - Translated tooltips and alt text for images

## File Structure
```
features/
└── hero/
    ├── README.md           - Feature documentation (this file)
    ├── index.ts            - Exports the main Hero component
    ├── components/         - React components for the hero feature
    │   ├── Hero.tsx        - Main hero section component
    │   └── HeroButtons.tsx - Call-to-action buttons component
    ├── hooks/              - Custom hooks for the hero feature
    │   └── useHero.ts      - Hook for retrieving internationalized hero content
    ├── types/              - TypeScript type definitions
    │   └── index.ts        - Hero-related type definitions
    ├── data/               - Language-specific data files
    │   ├── en.json         - English content data
    │   └── zh-TW.json      - Traditional Chinese content data
    └── styles/             - CSS styles for hero components
        ├── Hero.css        - Styles for hero section
        └── HeroButtons.css - Styles for call-to-action buttons
```

## Usage
Import the component from the hero feature:

```tsx
import { Hero } from '../features/hero';

const HomePage = () => {
  return (
    <section id="home" className="section-padding scroll-mt-20">
      <Hero />
    </section>
  );
};
```

## i18n Implementation

The Hero component now uses feature-based internationalization:

1. **Content Data**
   - Content is stored in language-specific JSON files in the `data/` directory
   - The `useHero` hook dynamically loads the appropriate data file based on the current language
   - Content structure is consistent across all language files
   - English (en.json) serves as the fallback if the current language data is unavailable

2. **UI Text Translation**
   - UI elements like section labels and ARIA attributes use the i18n translation system
   - Content data (like name, role, description) comes directly from language-specific JSON files
   - This separation allows for different approaches to content vs. UI elements

3. **Accessibility**
   - ARIA labels use appropriate language-specific text
   - Image alt texts are generated using the loaded content data
   - Tooltips for social links come directly from the content data

The component uses react-i18next's `useTranslation` hook for accessing translated strings, ensuring consistent language presentation throughout the application.

## Data Structure

Each language file in the `data/` directory follows this structure:

```json
{
  "hero": {
    "greeting": "Hello, I'm",
    "name": "John Doe",
    "role": "Full Stack Developer & Security Specialist",
    "description": "I create secure, user-friendly web applications...",
    "profileImage": "/images/aboutme/profile.png",
    "socialLinks": {
      "github": "https://github.com/johndoe",
      "linkedin": "https://linkedin.com/in/johndoe",
      "email": "contact@johndoe.com"
    },
    "cta": {
      "portfolio": "View Portfolio",
      "contact": "Contact Me"
    }
  }
}
```

The `useHero` hook loads this data based on the current language setting and provides it to the components. When the language changes, the hook dynamically loads the new language file and updates the UI accordingly.

## Implementation Notes

1. **Loading State**: The component handles loading states to prevent UI issues during data fetch
2. **Type Safety**: TypeScript interfaces ensure consistent data structure across languages
3. **Fallback Mechanism**: If a specific language file fails to load, the system falls back to English
4. **Backward Compatibility**: The implementation preserves compatibility with previous code
