import { Project } from '../hooks/useProjects';

export function getProjectsFromLocalStorage(): Project[] {
  return JSON.parse(localStorage.getItem('projects') || '[]');
}

export function setProjectsInLocalStorage(projects: Project[]) {
  localStorage.setItem('projects', JSON.stringify(projects));
}
