export interface HeroContent {
  greeting: string;
  name: string;
  title?: string;  // Making it optional since we're migrating to role
  role: string;    // This is the primary field now
  description: string;
  profileImage: string;
  social?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
  cta: {
    portfolio: string;
    contact: string;
  };
}