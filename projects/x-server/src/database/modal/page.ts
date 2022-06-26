import { MaterialSchema, PageSchema } from "packages/x-nodes/index";

// 创建页面参数
export class CreatePageDTO {
  title: string;
  material: MaterialSchema;
}

export class PagePO {
  vid: string;
  version: string;
  createUser: string;
  updateUser: string;
  schema: PageSchema;
}

export class PageVO extends PagePO {}

export class QueryPageDTO {
  vid: string;
  createUser: string;
  updateUser: string;
}
