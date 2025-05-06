export type SkillLevel = 'basic' | 'intermediate' | 'advanced' | 'expert';

export interface SkillNode {
  name: string;
  level?: SkillLevel;
  children?: SkillNode[];
}

export interface SkillTreeRoot {
  name: string;
  children: SkillNode[];
}

export interface SkillTreeData {
  skillTree: {
    title: string;
    description: string;
    root: SkillTreeRoot;
  };
}
