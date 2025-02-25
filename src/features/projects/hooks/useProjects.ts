import { useMemo } from 'react';
import projectsJson from '../data/projects.json';
import type { Project } from '../types';

export const useProjects = () => {
  const projects = useMemo(() => {
    const data: Project[] = projectsJson.projects;
    return data;
  }, []);

  const tags = useMemo(() => {
    return [...new Set(projects.flatMap(project => project.tags))];
  }, [projects]);

  return {
    projects,
    tags
  };
};