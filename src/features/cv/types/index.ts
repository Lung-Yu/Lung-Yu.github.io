export interface CVData {
    name: string;
    title: string;
    summary: string;
    skills: {
      category: string;
      items: string[];
    }[];
    experiences: {
      company: string;
      position: string;
      period: string;
      description: string[];
    }[];
    education: {
      school: string;
      degree: string;
      period: string;
      major: string;
    }[];
    conferences: {
      title: string;
      date: string;
    }[];
  }