export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  items: string[];
}

export interface SkillsData {
  skillCategories: {
    [key: string]: SkillCategory;
  };
}
