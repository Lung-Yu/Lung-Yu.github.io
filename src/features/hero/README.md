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
    ├── index.ts            - Exports the main Hero component
    ├── components/         - React components for the hero feature
    │   ├── Hero.tsx        - Main hero section component
    │   └── HeroButtons.tsx - Call-to-action buttons component
    ├── hooks/              - Custom hooks for the hero feature
    │   └── useHero.ts      - Hook for retrieving internationalized hero content
    ├── types/              - TypeScript type definitions
    │   └── index.ts        - Hero-related type definitions
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

The Hero component leverages a comprehensive i18n implementation to support multiple languages:

1. **Content Translation**
   - All visible text is retrieved through the `useHero` hook, which returns internationalized content
   - Translation keys follow a hierarchical structure (e.g., 'hero.socialLinks.github')
   - Fallback values are provided to ensure reliability

2. **Accessibility**
   - ARIA labels are translated to match the user's language preferences
   - Image alt texts are dynamically generated with the user's name in the correct language
   - Tooltips for social links are internationalized

3. **Configuration**
   - Translation files are stored in `/public/locales/[language-code]/` directories
   - The hero section's translations are part of a larger, feature-based translation structure

The component uses react-i18next's `useTranslation` hook for accessing translated strings, ensuring consistent language presentation throughout the application.

## Configuration
The Hero component retrieves its content from the `useHero` hook, which provides localized data:

```typescript
// Example heroContent structure returned by useHero hook
{
  greeting: "Hello, I'm",
  name: "John Doe",
  role: "Full Stack Developer & Security Specialist",
  description: "I create secure, user-friendly web applications with a focus on accessibility and performance.",
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "contact@johndoe.com"
  },
  profileImage: "/images/aboutme/profile.png"
}
```

The component automatically adapts to the user's language preferences, displaying all content in the selected language.
