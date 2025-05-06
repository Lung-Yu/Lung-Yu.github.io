export interface CVData {
  name: string;
  title: string;
  summary: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
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
    companyNote?: string;  // 新增此欄位
    position: string;
    period: string;
    description: string[];
    brief: string[];
    details: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    period: string;
    major: string;
    description?: string[];
  }>;
  conferences: Array<{
    title: string;
    date: string;
    venue?: string;
    organizer?: string;
    tags?: string[];
    url?: string;
  }>;
}