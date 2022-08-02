/**
 * 项目数据实体定义
 */
import { ApiProperty } from "@nestjs/swagger";
import {
  TypeDatasetConfig,
  TypePageConfig,
  TypeProjectConfig,
  TypeRouterConfig
} from "@lowcode/types";

/**
 * 路由配置
 */
export class RouterConfig implements TypeRouterConfig {
  base: string;
  @ApiProperty({ enum: ["hash", "history", "memory"] })
  mode: TypeRouterConfig["mode"] = "hash";
  @ApiProperty({ type: Object })
  meta: TypeRouterConfig["meta"];
}

/**
 * 数据集配置
 */
export class DatasetConfig implements TypeDatasetConfig {
  dataset: {
    id: string;
    version: string;
  };
  name: string;
}

/**
 * 页面配置
 */
export class PageConfig implements TypePageConfig {
  id: string;
  component: {
    id: string;
    version: string;
  };
  title: string;
  name: string;
  path: string;
}

/**
 * 项目配置
 */
export class ProjectConfig implements TypeProjectConfig {
  router: RouterConfig;
  datasets: DatasetConfig[];
  pages: PageConfig[];
}
