import { ICreateProjectParams } from "packages/x-core/src/types/dto/project";

export class CreateProjectDTO implements ICreateProjectParams {
  title: string;
  description: string;
}
