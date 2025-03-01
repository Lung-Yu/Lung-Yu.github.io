export interface CVData {
  name: string;
  title: string;
  summary: string;
  sections: {
    skills: string;
    experience: string;
    education: string;
    conferences: string;
  };
  skills: Array<{
    category: string;
    items: string[];
  }>;
  experiences: Array<{
    company: string;
    position: string;
    period: string;
    description: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    period: string;
    major: string;
    description?: string[];
  }>;
  conferences?: Array<{
    title: string;
    date: string;
  }>;
}