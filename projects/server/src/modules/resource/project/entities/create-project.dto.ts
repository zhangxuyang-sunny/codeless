import { ICreateProjectParams } from "@lowcode/types";

export class CreateProjectDTO implements ICreateProjectParams {
  title: string;
  description: string;
}
