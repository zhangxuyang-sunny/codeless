import { IComponentSchema } from "../schemas/project";

export interface ICreateComponentParams {
  applicationId: string;
  title: string;
  description: string;
  schema: IComponentSchema;
}

export interface IFindComponentParams {
  id?: string;
  title?: string;
  createdUser?: string;
  updatedUser?: string;
  createdTimeRange?: [number, number];
  updatedTimeRange?: [number, number];
}

export interface IUpdateComponentParams {
  id: string;
  title?: string;
  description?: string;
  schema?: IComponentSchema;
}
