import { MimeType } from "file-type";

import { ModuleTypes } from "./type-enums";

/**
 * 静态资源模块
 * @TODO 待方案实现
 */
export interface StaticModule {
  type: ModuleTypes.static;
  title: string;
  description: string;
  mimeType: MimeType;
  src: string;
}
