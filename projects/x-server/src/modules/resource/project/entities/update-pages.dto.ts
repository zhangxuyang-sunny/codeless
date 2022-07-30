import { IUpdatePagesParams } from "packages/x-core/src/types/dto/project";
import { PageConfig } from "../entities/project.entity";

/**
 * 更新项目中页面配置
 */
export class UpdatePagesDTO implements IUpdatePagesParams {
  id: string;
  pages: PageConfig[];
}
