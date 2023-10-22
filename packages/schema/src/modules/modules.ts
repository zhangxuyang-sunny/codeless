import { ComponentModule } from "./component";
import { StaticModule } from "./static";

/**
 * 模块协议：模块是所有可被重用的资源集合，包括组件模块、静态资源模块
 * 静态资源模块包括图片、声音、文件等，使用 mimeType 进行区分
 */
export type Modules = ComponentModule | StaticModule;
