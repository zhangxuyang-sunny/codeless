import { ProjectSchema } from "packages/x-nodes";
import { ProjectStatus } from "src/business/project.service";

export type ProjectVO = ProjectSchema & {
  uuid: string;
  status: ProjectStatus;
};
