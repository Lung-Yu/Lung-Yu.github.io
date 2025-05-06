# Certificates Feature

## Description
The Certificates feature displays the user's professional certifications and achievements in an organized gallery format. It supports multiple languages through the i18n system for global accessibility.

## Core Components
- **CertificateGallery**: Main component for displaying all certificates
- **CertificateCard**: Component for showing individual certificate details
- **CertificateFilter**: Component for filtering certificates by category or issuer

## Features
- Responsive grid layout for certificate display
- Filtering options by certification category (e.g., Cyber Security, Development, Infrastructure)
- Organization by issuing institution
- Light/dark mode compatible design
- Detailed view with certification details in modal popup
- Comprehensive multilingual support with:
  - Translated certificate titles, descriptions, and details
  - Localized category filters
  - Internationalized UI elements and accessibility attributes
  - Dynamic content loading based on selected language

## File Structure
```
features/
└── certificates/
    ├── index.ts               - Exports the main Certificate components
    ├── components/            - React components for certificates
    │   ├── CertificateList.tsx - Main component for displaying certificates
    │   └── CertificateModal.tsx - Modal for detailed certificate view
    ├── data/                  - Certificate data and configurations
    │   └── certificates.json  - Certificate data structure
    ├── hooks/                 - Custom hooks for certificate functionality
    │   └── useCertificates.ts - Hook for certificate data handling with i18n support
    ├── styles/                - CSS styles for certificate components
    │   ├── Certificates.css   - Styles for certificate list
    │   └── CertificateModal.css - Styles for certificate modal
    └── types/                 - TypeScript type definitions
        └── index.ts           - Certificate type definitions
```

## i18n Implementation

The Certificates feature is fully internationalized using react-i18next:

1. **Certificate Data Structure**
   - Each certificate has a unique ID generated from its title/abbreviation
   - This ID is used as a key in translation files

2. **Translation Files**
   - Located in `/src/i18n/locales/[language-code]/certificates.json`
   - Structure includes:
     - UI text (titles, buttons, labels)
     - Category names
     - Certificate-specific translations (title, description, etc.)

3. **Dynamic Content Loading**
   - The `useTranslation` hook is used to access translations
   - Fallback to raw data values when translations aren't available
   - Certificate details are translated using their unique IDs

4. **Accessibility**
   - All ARIA attributes are properly internationalized
   - ALT text for images is translated for each language

## Usage
Import the components from the certificates feature:

```tsx
import { CertificateList } from '../features/certificates';

const CertificatesSection = () => {
  return (
    <section id="certificates" className="section-padding scroll-mt-20">
      <CertificateList />
    </section>
  );
};
```

The certificates will be automatically displayed in the user's selected language based on the i18n context.
  );
};
```
