export interface SkillsData {
  categories: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
  items: {
    [key: string]: string[];
  };
}
