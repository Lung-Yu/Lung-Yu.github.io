/**
 * Certificate interface - defines the structure of certificate data
 * This ensures consistent data structure across languages
 */
export interface Certificate {
    id: string;                // Unique identifier for the certificate, consistent across languages
    title: string;             // Localized certificate title
    institution: string;       // Organization issuing the certificate
    category: string;          // Localized category name
    categoryKey?: string;      // Standardized category key for i18n lookups (generated automatically)
    image: string;             // Path to certificate image
    description: string;       // Localized detailed description
    fullName: string;          // Localized full name of the certification
    abbreviation: string;      // Standard abbreviation (typically not translated)
    obtainedAt: string;        // Date the certificate was obtained (YYYY-MM-DD)
    expiryDate?: string;       // Date the certificate expires (YYYY-MM-DD), if applicable
    value: number;             // Numerical value for sorting (higher = more important)
}