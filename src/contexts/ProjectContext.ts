import { createContext } from "react";
import { Project } from "types/project";

export interface ProjectContextValue {
  project?: Project;
}

const ProjectContext = createContext<ProjectContextValue | undefined>(
  undefined
);

export default ProjectContext;
