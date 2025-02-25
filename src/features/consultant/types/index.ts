export interface ConsultingProject {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    services: string[];
    detailPath: string;
    gallery?: string[];
    results?: string[];
  }