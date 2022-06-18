import { IsIn } from "class-validator";
import { TypeProjectSchema } from "packages/x-types/project";
import { ProjectStatus } from "src/database/schemas/project.schema";

// 工程持久化对象
export class ProjectPO {
  pid: string;
  createUser: string;
  updateUser: string;
  status: ProjectStatus;
  version: string;
  title: string;
  schema: TypeProjectSchema;
}

export class ProjectVO extends ProjectPO {}

const statusString = [ProjectStatus.delete, ProjectStatus.normal, ProjectStatus.unlink];
export class QueryProjectDTO {
  pid: string;
  createUser: string;
  updateUser: string;
  @IsIn(statusString, { message: `status 校验未通过 (${statusString})` })
  status: ProjectStatus;
}

// 创建工程传输对象
export class CreateProjectDTO {
  version: string;
  title: string;
  schema: TypeProjectSchema;

  // @IsString({ groups: [NodeTypes.Project] })
  // type: NodeTypes.Project;
  // @IsObject()
  // router: RouterSchema;
  // @IsArray()
  // piniaList: PiniaSchema[];
  // @IsArray()
  // pageList: PageSchema[];
}

// 工程业务数据
export class CreateProjectBO extends ProjectPO {}

// 更新工程
export class UpdateProjectSchemaDTO extends CreateProjectDTO {}
