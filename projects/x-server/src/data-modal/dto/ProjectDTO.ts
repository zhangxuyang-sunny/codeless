import { NodeTypes, PageSchema, PiniaSchema, ProjectSchema, RouterSchema } from "packages/x-nodes";

export class CreateProjectDTO implements ProjectSchema {
  // ProjectSchema
  type: NodeTypes.Project;
  router: RouterSchema;
  piniaList: PiniaSchema[];
  pageList: PageSchema[];
}
