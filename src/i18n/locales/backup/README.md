# Backup of Legacy i18n Data Files

These files have been backed up on May 7, 2025 as part of migrating to a feature-based architecture for localization.

## Files in this backup

- `en/projectsData.json` - Project data now loaded from `/src/features/projects/data/en.json`
- `en/certificatesData.json` - Certificate data now loaded from `/src/features/certificates/data/en.json`
- `en/skills.json` - Skills data now loaded from `/src/features/skills/data/en.json`
- `zh-TW/projectsData.json` - Project data now loaded from `/src/features/projects/data/zh-TW.json`
- `zh-TW/certificatesData.json` - Certificate data now loaded from `/src/features/certificates/data/zh-TW.json`
- `zh-TW/skills.json` - Skills data now loaded from `/src/features/skills/data/zh-TW.json`
- `en/consultant.json` (partial) - Consulting data now loaded from `/src/features/consultant/data/en.json`
- `zh-TW/consultant.json` (partial) - Consulting data now loaded from `/src/features/consultant/data/zh-TW.json`
- `en/hero.json` (partial) - Hero data now loaded from `/src/features/hero/data/en.json`
- `zh-TW/hero.json` (partial) - Hero data now loaded from `/src/features/hero/data/zh-TW.json`

## Migration to Feature-based Architecture

The project now follows a feature-based architecture where:

1. UI text translations (labels, buttons, etc.) remain in the central i18n system at `/src/i18n/locales/{language}/*.json`
2. Feature-specific data (projects, certificates, skills, consultant, hero) is moved to their respective feature directories at `/src/features/{featureName}/data/{language}.json`

Each feature uses its own custom hook (e.g., `useProjects`, `useCertificates`, `useSkills`, `useConsulting`, `useHero`) to load its data based on the current language.

## Features not migrated

- `cv` - The CV feature still uses i18n files for data as it doesn't have a separate data directory structure yet.
- `navigation` - Navigation uses i18n for UI text but has its own configuration data.

## Important Note - Mixed Mode Features

- `skills`, `projects`, `certificates`, `consultant`, `hero` - These features use a mixed mode:
  - Feature-specific data is stored in `/src/features/{featureName}/data/{language}.json`
  - UI text translations (titles, buttons, labels) remain in `/src/i18n/locales/{language}/{featureName}.json`
