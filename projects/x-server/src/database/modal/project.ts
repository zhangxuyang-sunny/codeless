import { IsArray, IsObject, IsString } from "class-validator";
import { NodeTypes, PageSchema, PiniaSchema, ProjectSchema, RouterSchema } from "packages/x-nodes";
import { ProjectStatus } from "src/database/schemas/project.schema";

// 工程持久化对象
export class ProjectPO {
  pid: string;
  createUser: string;
  updateUser: string;
  status: ProjectStatus;
  schema: ProjectSchema;
}

export class ProjectVO extends ProjectPO {}

// 创建工程传输对象
export class CreateProjectDTO implements ProjectSchema {
  @IsString({ groups: [NodeTypes.Project] })
  type: NodeTypes.Project;
  @IsObject()
  router: RouterSchema;
  @IsArray()
  piniaList: PiniaSchema[];
  @IsArray()
  pageList: PageSchema[];
}

// 工程业务数据
export class CreateProjectBO extends ProjectPO {}

// 更新工程
export class UpdateProjectSchemaDTO extends CreateProjectDTO {}
