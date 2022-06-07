import { ProjectSchema } from "packages/x-nodes";
import { ProjectStatus } from "src/business/project.service";

export type ProjectPO = ProjectSchema & {
  pid: string;
  createUser: string;
  updateUser: string;
  status: ProjectStatus;
};
