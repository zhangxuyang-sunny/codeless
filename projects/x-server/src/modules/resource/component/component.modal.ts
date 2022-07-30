import {
  ICreateComponentParams,
  IFindComponentParams,
  IUpdateComponentParams
} from "packages/x-core/src/types/dto/component";
import { IComponentSchema } from "packages/x-core/src/types/schemas/project";

export class CreateComponentDTO implements ICreateComponentParams {
  applicationId: string;
  title: string;
  description: string;
  schema: IComponentSchema;
}

export class UpdateComponentDTO implements IUpdateComponentParams {
  id: string;
  title?: string;
  description?: string;
  schema?: IComponentSchema;
}

export class FindComponentsDTO implements IFindComponentParams {
  id?: string;
  title?: string;
  createdUser?: string;
  updatedUser?: string;
  createdTimeRange?: [number, number];
  updatedTimeRange?: [number, number];
}
