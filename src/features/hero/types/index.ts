export interface HeroContent {
    greeting: string;
    name: string;
    title: string;
    description: string;
    profileImage: string;
    social?: {
      github?: string;
      linkedin?: string;
      email?: string;
    };
  }