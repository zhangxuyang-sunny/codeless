import { MaterialSchema, PageSchema } from "packages/x-nodes/index";

// 创建页面参数
export class CreatePageDTO {
  projectId: string;
  title: string;
  material: MaterialSchema;
}

export class PagePO {
  pageId: string;
  version: string;
  createUser: string;
  updateUser: string;
  schema: PageSchema;
}

export class PageVO extends PagePO {}

export class QueryPageDTO {
  pageId: string;
  title: string;
  createUser: string;
  updateUser: string;
}
