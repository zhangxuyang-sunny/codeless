import { IsIn } from "class-validator";
import { ViewOption } from "packages/x-nodes/dist";
import { ProjectSchema } from "packages/x-nodes/index";
import { ProjectStatus } from "src/database/schemas/project.schema";

// 创建工程传输对象
export class CreateProjectDTO {
  title: string;
  schema: ProjectSchema;

  // @IsString({ groups: [NodeTypes.Project] })
  // type: NodeTypes.Project;
  // @IsObject()
  // router: RouterSchema;
  // @IsArray()
  // piniaList: PiniaSchema[];
  // @IsArray()
  // pageList: PageSchema[];
}

export class UpdateViewsDTO {
  projectId: string;
  viewOptions: ViewOption[];
}

// 工程持久化对象
export class ProjectPO {
  projectId: string;
  createUser: string;
  updateUser: string;
  status: ProjectStatus;
  version: string;
  title: string;
  schema: ProjectSchema;
}

export class ProjectVO extends ProjectPO {}

const statusString = [ProjectStatus.delete, ProjectStatus.normal, ProjectStatus.unlink];
export class QueryProjectDTO {
  projectId: string;
  createUser: string;
  updateUser: string;
  @IsIn(statusString, { message: `status 校验未通过 (${statusString})` })
  status: ProjectStatus;
}

// 更新工程
export class UpdateProjectSchemaDTO {
  status?: ProjectStatus;
  title?: string;
  schema?: ProjectSchema;
  pages?: string[];
}
