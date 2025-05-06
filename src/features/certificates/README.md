# Certificates Feature

## Description
The Certificates feature displays the user's professional certifications and achievements in an organized gallery format. It supports multiple languages through the i18n system for global accessibility. Users can view certificates categorized by field (such as Cyber Security, Development, etc.) and access detailed information about each certification.

## Core Components
- **CertificateList**: Main component for displaying all certificates in a grid layout
- **CertificateModal**: Component for showing detailed certificate information
- **CategoryFilter**: Component for filtering certificates by category

## Features
- Interactive certificate gallery with responsive grid layout
- Certificate filtering by professional category
- Detailed modal view with extended certification information
- Multilingual support (English and Traditional Chinese)
- Certificate value-based sorting algorithm
- Date-based secondary sorting for certificates of equal value

## File Structure
```
features/
└── certificates/
    ├── index.ts                 - Exports the main Certificate components
    ├── README.md                - Documentation for the feature (this file)
    ├── components/              - React components for the certificates feature
    │   ├── CertificateList.tsx  - Main gallery component for certificates
    │   └── CertificateModal.tsx - Modal component for certificate details
    ├── hooks/                   - Custom hooks for certificate functionality
    │   └── useCertificates.ts   - Hook for certificate data handling
    ├── styles/                  - CSS styles for certificate components
    │   └── Certificates.css     - Styles for certificate components
    ├── data/                    - Legacy data storage (now moved to i18n)
    │   └── certificates.json    - Legacy certificate data file (not used)
    └── types/                   - TypeScript type definitions
        └── index.ts             - Types for certificate data
```

## Internationalization (i18n)
This feature fully supports multilingual content through the i18n system:

- Certificate data is stored in language-specific JSON files:
  - `/src/i18n/locales/en/certificatesData.json` (English)
  - `/src/i18n/locales/zh-TW/certificatesData.json` (Traditional Chinese)
- UI labels and interface text are stored in:
  - `/src/i18n/locales/en/certificates.json` (English)
  - `/src/i18n/locales/zh-TW/certificates.json` (Traditional Chinese)

## Usage
Import the components from the certificates feature:
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
