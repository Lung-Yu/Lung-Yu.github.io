interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "React + Vite 開發項目",
    description: "使用現代化前端技術棧開發的範例專案，展示了最佳實踐和效能優化技術。",
    image: "/src/assets/images/projects/default.jpg",
    tags: ["React", "Vite", "TypeScript"],
    github: "https://github.com/your-username/project1",
    demo: "https://demo-link-1.com"
  },
  {
    id: 2,
    title: "TypeScript + CSS 專案",
    description: "展示TypeScript與現代CSS技術的範例項目，包含響應式設計與動畫效果。",
    image: "/src/assets/images/projects/default.jpg",
    tags: ["TypeScript", "CSS", "Web Development"],
    github: "https://github.com/your-username/project2",
    demo: "https://demo-link-2.com"
  },
  {
    id: 3,
    title: "TypeScript + CSS 專案",
    description: "展示TypeScript與現代CSS技術的範例項目，包含響應式設計與動畫效果。",
    image: "/src/assets/images/projects/default.jpg",
    tags: ["TypeScript", "CSS", "Web Development"],
    github: "https://github.com/your-username/project2",
    demo: "https://demo-link-2.com"
  },
  {
    id: 4,
    title: "TypeScript + CSS 專案",
    description: "展示TypeScript與現代CSS技術的範例項目，包含響應式設計與動畫效果。",
    image: "/src/assets/images/projects/default.jpg",
    tags: ["TypeScript", "CSS", "Web Development"],
    github: "https://github.com/your-username/project2",
    demo: "https://demo-link-2.com"
  },
  {
    id: 5,
    title: "TypeScript + CSS 專案",
    description: "展示TypeScript與現代CSS技術的範例項目，包含響應式設計與動畫效果。",
    image: "/src/assets/images/projects/default.jpg",
    tags: ["TypeScript", "CSS", "Web Development"],
    github: "https://github.com/your-username/project2",
    demo: "https://demo-link-2.com"
  },
  
];

export { projects };
export type { Project };
