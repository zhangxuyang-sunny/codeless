import { ProjectSchema } from "packages/x-nodes";
import { ProjectStatus } from "src/business/project.service";

export type ProjectPO = ProjectSchema & {
  uuid: string;
  status: ProjectStatus;
};
