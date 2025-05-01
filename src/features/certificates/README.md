# Certificates Feature

## Description
The Certificates feature displays the user's professional certifications and achievements in an organized gallery format. It supports multiple languages through the i18n system for global accessibility.

## Core Components
- **CertificateGallery**: Main component for displaying all certificates
- **CertificateCard**: Component for showing individual certificate details
- **CertificateFilter**: Component for filtering certificates by category or issuer

## Features
- Responsive grid layout for certificate display
- Filtering options by certification category (e.g., Cloud, Security, Development)
- Organization by issuing institution
- Light/dark mode compatible design
- Detailed view with certification details and verification links
- Multilingual support through i18n integration

## File Structure
```
features/
└── certificates/
    ├── index.ts               - Exports the main Certificate components
    ├── components/            - React components for certificates
    │   ├── CertificateGallery.tsx - Main gallery component
    │   ├── CertificateCard.tsx    - Individual certificate component
    │   └── ...                - Other supporting components
    ├── data/                  - Certificate data and configurations
    │   └── certificates.ts    - Certificate data structure
    ├── hooks/                 - Custom hooks for certificate functionality
    │   └── useCertificates.ts - Hook for certificate data handling
    ├── styles/                - CSS styles for certificate components
    │   └── Certificates.css   - Styles for certificate components
    └── types/                 - TypeScript type definitions
        └── certificate.types.ts - Types for certificate data
```

## Usage
Import the components from the certificates feature:

```tsx
import { CertificateGallery } from '../features/certificates';

const CertificationsPage = () => {
  return (
    <section>
      <h2>My Professional Certifications</h2>
      <CertificateGallery />
      {/* Or with specific filter */}
      <CertificateGallery filter="cloud" />
    </section>
  );
};
```
