import { IDatasetsVO, IProjectVO } from "packages/x-core/src/types/project";
import { IViewVO } from "./view";

export interface WithDocument {
  createdUser: string;
  updatedUser: string;
  createdAt: string;
  updatedAt: string;
}

// 资源
export interface IResource {
  projects: IProjectVO[];
  views: IViewVO[];
  datasets: IDatasetsVO[];
}
