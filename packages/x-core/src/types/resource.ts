import { IDatasetsVO, IProject } from "packages/x-core/src/types/project";
import { IView } from "./view";

export interface WithDocument {
  createdUser: string;
  updatedUser: string;
  createdAt: string;
  updatedAt: string;
}

// 资源
export interface IResource {
  projects: IProject[];
  views: IView[];
  datasets: IDatasetsVO[];
}
