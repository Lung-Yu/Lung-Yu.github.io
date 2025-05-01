# Navigation Feature

## Description
The Navigation feature provides a responsive, user-friendly navigation system for the portfolio website. It allows visitors to easily access different sections of the site and includes support for multiple languages through the i18n system.

## Core Components
- **MainNavigation**: Primary navigation component that renders the main menu
- **MobileMenu**: Responsive menu for mobile devices
- **LanguageSwitcher**: Component for changing the website language
- **ThemeToggle**: Component for switching between light and dark modes

## Features
- Responsive design that adapts to all screen sizes
- Smooth transitions between navigation states
- Active link highlighting
- Dropdown menus for grouped content (when needed)
- Mobile-friendly hamburger menu with animations
- Language selection integration
- Theme switching capability
- Scroll-aware behavior (e.g., transparent to solid background on scroll)

## File Structure
```
features/
└── navigation/
    ├── index.ts                - Exports the main Navigation components
    ├── components/             - React components for navigation
    │   ├── MainNavigation.tsx  - Main navigation component
    │   ├── MobileMenu.tsx      - Mobile-specific menu component
    │   ├── LanguageSwitcher.tsx- Component for language selection
    │   ├── ThemeToggle.tsx     - Component for theme switching
    │   └── ...                 - Other supporting components
    └── styles/                 - CSS styles for navigation components
        ├── Navigation.css      - Styles for navigation components
        └── MobileMenu.css      - Mobile-specific styles
```

## Usage
Import the components from the navigation feature:

```tsx
import { MainNavigation } from '../features/navigation';

const Layout = ({ children }) => {
  return (
    <>
      <MainNavigation 
        links={[
          { text: 'Home', path: '/' },
          { text: 'Projects', path: '/projects' },
          { text: 'Skills', path: '/skills' },
          { text: 'CV', path: '/cv' },
          { text: 'Contact', path: '/contact' },
        ]}
      />
      <main>{children}</main>
      <footer>...</footer>
    </>
  );
};
```

## Configuration
The MainNavigation component accepts several props for customization:

- `links`: Array of navigation links with text and path
- `logo`: Logo component or image path
- `enableLanguageSwitch`: Boolean to show/hide language switcher
- `enableThemeToggle`: Boolean to show/hide theme toggle
- `transparent`: Boolean to make the initial navigation state transparent
