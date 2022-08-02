import { IUpdatePagesParams } from "@lowcode/types";
import { PageConfig } from "./project.entity";

/**
 * 更新项目中页面配置
 */
export class UpdatePagesDTO implements IUpdatePagesParams {
  id: string;
  pages: PageConfig[];
}
