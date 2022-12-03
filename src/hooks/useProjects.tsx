import { createContext, useContext, useEffect, useState } from 'react';
import {
  getProjectsFromLocalStorage,
  setProjectsInLocalStorage,
} from '../helpers/localStorage';

export interface Project {
  id: string;
  name: string;
}

export interface ProjectsData {
  isAddingNewProject: boolean;
  setIsAddingNewProject: (isAdding: boolean) => void;
  projects: Project[];
  addProject: (name: string) => void;
  deleteProject: (id: string) => void;
  updateProject: (id: string, name: string) => void;
  swapProjects: (sourceIndex: number, destinationIndex: number) => void;
}

const projectsContext = createContext<ProjectsData>({} as ProjectsData);

export const ProjectsProvider: React.FC<any> = (props) => {
  const [projects, setProjects] = useState<Project[]>(
    getProjectsFromLocalStorage()
  );
  const [isAddingNewProject, setIsAddingNewProject] = useState(false);

  const addProject = (name: string) => {
    const newProject = {
      id: new Date().toISOString(),
      name,
    };

    setProjects([...projects, newProject]);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const updateProject = (id: string, name: string) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === id) {
        return {
          ...project,
          name,
        };
      }

      return project;
    });

    setProjects(updatedProjects);
  };

  const swapProjects = (sourceIndex: number, destinationIndex: number) => {
    const newProjects = [...projects];
    const [removed] = newProjects.splice(sourceIndex, 1);
    newProjects.splice(destinationIndex, 0, removed);

    setProjects(newProjects);
  };

  useEffect(() => {
    setProjectsInLocalStorage(projects);
  }, [projects]);

  return (
    <projectsContext.Provider
      value={{
        projects,
        deleteProject,
        updateProject,
        addProject,
        isAddingNewProject,
        setIsAddingNewProject,
        swapProjects,
      }}
    >
      {props.children}
    </projectsContext.Provider>
  );
};

export const useProjects = (): ProjectsData => {
  const context = useContext(projectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }

  return context;
};
