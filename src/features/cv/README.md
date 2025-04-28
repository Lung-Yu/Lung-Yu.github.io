# CV Feature

The CV feature displays professional experience, education, skills, and conferences in a visually appealing layout.

## Features

- Responsive design for all screen sizes
- Multi-language support with language switching
- Expandable sections for detailed information
- Timeline view for work experience
- Card-based display for education and conferences

## Usage

The CV feature imports data from localized JSON files and supports both English and Traditional Chinese (zh-TW). Content is displayed in a structured format with expandable sections that can be toggled individually or all at once.

## Structure

- `components/CV.tsx` - Main component that renders the CV
- `hooks/useCV.ts` - Custom hook to fetch and process CV data
- `styles/CV.css` - Styles for the CV component

## Data Format

The CV data is structured as follows:

```json
{
  "name": "Name",
  "title": "Professional Title",
  "summary": "Professional summary",
  "sections": {
    "skills": "Skills",
    "experience": "Experience",
    "education": "Education",
    "conferences": "Conferences"
  },
  "skills": [...],
  "experiences": [...],
  "education": [...],
  "conferences": [...]
}
```

For experience entries, use the following format for proper hierarchical display:

```json
{
  "company": "Company Name",
  "position": "Position Title",
  "period": "YYYY/MM - YYYY/MM",
  "brief": [
    "Brief point 1",
    "Brief point 2"
  ],
  "details": [
    "Category 1:",
    "- Detail point 1",
    "- Detail point 2",
    "Category 2:",
    "- Detail point 3",
    "- Detail point 4"
  ]
}
```

The details section supports hierarchical formatting where:
- Strings ending with ":" are rendered as section titles
- Strings starting with "- " are rendered as nested items
- Other strings are rendered as main items
