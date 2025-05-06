# Hero Feature

## Description
The Hero feature provides a prominent, eye-catching introduction section that appears at the top of the portfolio homepage. It showcases key information about the user and creates a strong first impression for visitors.

## Core Components
- **Hero**: Main component that renders the hero section
- **HeroBackground**: Component for displaying the background effects or images
- **HeroContent**: Component for organizing the text and call-to-action elements

## Features
- Responsive design that looks great on all devices
- Animated entrance effects for visual appeal
- Integration with floating orbs or other background effects
- Configurable content and appearance
- Clear call-to-action buttons
- Support for both light and dark themes
- Multilingual support through i18n integration

## File Structure
```
features/
└── hero/
    ├── index.ts            - Exports the main Hero component
    ├── components/         - React components for the hero feature
    │   ├── Hero.tsx        - Main hero section component
    │   ├── HeroBackground.tsx - Background component
    │   ├── HeroContent.tsx - Content organization component
    │   └── ...             - Other supporting components
    └── styles/             - CSS styles for hero components
        └── Hero.css        - Styles for hero section
```

## Usage
Import the component from the hero feature:

```tsx
import { Hero } from '../features/hero';

const HomePage = () => {
  return (
    <main>
      <Hero 
        title="John Doe" 
        subtitle="Full Stack Developer & UI/UX Designer"
        ctaText="View My Work"
        ctaLink="/projects"
      />
      {/* Other page content */}
    </main>
  );
};
```

## Configuration
The Hero component accepts several props for customization:

- `title`: Main heading text
- `subtitle`: Secondary descriptive text
- `ctaText`: Call-to-action button text
- `ctaLink`: Call-to-action button link
- `backgroundType`: Type of background to display ('gradient', 'image', 'video', 'animated')
- `backgroundSrc`: Source URL for background image or video if applicable
