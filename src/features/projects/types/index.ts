interface Highlight {
    title: string;
    description: string;
    icon: string;
}

interface DemoStep {
    title: string;
    description: string;
    image: string;
}

interface Installation {
    steps: string[];
}

interface Configuration {
    [section: string]: {
        [key: string]: string;
    };
}

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    github?: string;
    demo?: string;
    detailPath: string;
    gallery?: string[];
    videos?: string[];
    startDate: string;
    endDate: string;
    featured?: boolean;
    archived?: boolean;
    type: 'webApp' | 'security' | 'automation';
    highlights?: Highlight[];
    features?: string[];
    demoSteps?: DemoStep[];
    installation?: Installation;
    configuration?: Configuration;
}