# Floating Orbs Feature

## Description
The Floating Orbs feature provides an interactive, animated background element that adds visual interest to the portfolio website. It creates a dynamic atmosphere with floating orb elements that respond to user interaction.

## Core Components
- **FloatingOrbs**: Main component that renders the animated orbs background
- **Orb**: Individual orb component with animation and interaction capabilities
- **OrbsController**: Component for managing orbs behavior and settings

## Features
- Smooth, physics-based animation for floating elements
- Interactive response to mouse movement and cursor position
- Customizable orb appearance (size, color, opacity)
- Performance-optimized rendering using Canvas API or CSS transforms
- Responsive behavior adapting to different screen sizes
- Light/dark mode compatible color schemes

## File Structure
```
features/
└── floatingOrbs/
    ├── index.ts               - Exports the main FloatingOrbs component
    ├── components/            - React components for the orbs feature
    │   ├── FloatingOrbs.tsx   - Main orbs container component
    │   ├── Orb.tsx            - Individual orb component
    │   └── ...                - Other supporting components
    └── styles/                - CSS styles for orb components
        └── FloatingOrbs.css   - Styles for orb animations and appearance
```

## Usage
Import the component from the floatingOrbs feature:

```tsx
import { FloatingOrbs } from '../features/floatingOrbs';

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Add as background element */}
      <FloatingOrbs count={20} speed={1.5} />
      
      <h1>Welcome to my Portfolio</h1>
      {/* Other content */}
    </div>
  );
};
```

## Configuration
The FloatingOrbs component accepts several props for customization:

- `count`: Number of orbs to display (default: 15)
- `speed`: Animation speed factor (default: 1)
- `colors`: Array of colors for the orbs
- `interactive`: Boolean to enable/disable mouse interaction
- `opacity`: Base opacity value for orbs
