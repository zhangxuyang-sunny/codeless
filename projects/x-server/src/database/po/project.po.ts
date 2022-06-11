import { NodeTypes, PageSchema, PiniaSchema, ProjectSchema, RouterSchema } from "packages/x-nodes";
import { ProjectStatus } from "src/business/project.service";

export class ProjectPO implements ProjectSchema {
  pid: string;
  createUser: string;
  updateUser: string;
  status: ProjectStatus;

  // ProjectSchema
  type: NodeTypes.Project;
  router: RouterSchema;
  piniaList: PiniaSchema[];
  pageList: PageSchema[];
}
