export interface Certificate {
    title: string;
    institution: string;
    category: string;
    image: string;
    description: string;
    fullName: string;
    abbreviation: string;
    obtainedAt: string;
    expiryDate?: string; // Optional field for expiry date
    value: number; // Added value field for market value
  }
  