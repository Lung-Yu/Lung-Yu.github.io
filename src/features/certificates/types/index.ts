export interface Certificate {
    id: string; // Unique identifier for the certificate, used for i18n keys
    title: string;
    institution: string;
    category: string;
    categoryKey?: string; // Standardized category key for i18n lookups
    image: string;
    description: string;
    fullName: string;
    abbreviation: string;
    obtainedAt: string;
    expiryDate?: string;
    value: number;
}