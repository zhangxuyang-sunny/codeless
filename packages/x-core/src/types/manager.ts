import { ComponentStatus, ProjectStatus } from "../enums";
import {
  IApplicationSchema,
  IComponentSchema,
  IDatasetSchema
} from "./schemas/project";
import { IMaterialSchema } from "./schemas/material";

// 资源管理
// 注意：这里是业务数据
// 注意：这里是业务数据
// 注意：这里是业务数据

// 资源的业务 meta 信息
export interface IMetaData {
  // 当前语言下的标题
  title: string;
  // 当前语言下的描述
  description: string;
  // 版本号
  version: string;
  // 资源状态
  status: ProjectStatus | ComponentStatus;
  // 创建时间
  createdAt: string;
  // 更新时间
  updatedAt: string;
  // 创建人
  createdUser: string;
  // 更新人
  updatedUser: string;
}

/**
 * 项目配置没有组件、数据集等实体数据，它们都是通过 id 进行连接的，这样做的好处是：
 * 1. 项目配置和应用数据解耦，可以方便得进行版本切换
 * 2. 数据结构简单，便于看出项目中的结构
 * 通过 id 关联名下或团队下的页面、数据集等，最终通过 Transformer 处理转换得到应用 Application
 */
// 应用配置
export interface IApplicationConfig {
  id: string;
  config: {
    router: {
      // 基础路径
      base: string;
      // 路由模式
      mode: "hash" | "history" | "memory";
      meta: Record<string, unknown>;
    };
    // 页面列表
    pages: Array<{
      id: string;
      // 关联一个组件，在 ProjectData.resources.components 中匹配
      component: {
        id: string;
        version: string;
      };
      // 页面标题
      title: string;
      // 页面运行时名称
      name: string;
      // 页面路由路径
      path: string;
    }>;
    // 资料库列表
    datasets: Array<{
      // 关联一个数据集，在 ProjectData.resources.datasets 中匹配
      dataset: {
        id: string;
        version: string;
      };
      // 修改默认的数据集名称
      name: string;
    }>;
  };
  resource: {
    // 组件列表
    components: IComponentSchema[];
    // 数据集列表
    datasets: IDatasetSchema[];
  };
}

export type TypeProjectConfig = IApplicationConfig["config"];

export type TypePageConfig = IApplicationConfig["config"]["pages"][number];

export type TypeRouterConfig = IApplicationConfig["config"]["router"];

export type TypeDatasetConfig =
  IApplicationConfig["config"]["datasets"][number];

export interface IProjectConfigData
  extends Omit<IApplicationConfig, "resource">,
    IMetaData {}

/**
 * 应用配置数据
 * 通过 ProjectTransformer 处理生成 ApplicationData
 */
export interface IApplicationConfigData
  extends Omit<IApplicationConfig, "resource">,
    IMetaData {
  resource: {
    // 组件列表
    components: IComponentData[];
    // 数据集列表
    datasets: IDatasetData[];
  };
}

/**
 * 应用数据
 * 由 ProjectTransformer 解析 ProjectData 生成
 */
export interface IApplicationData extends IMetaData {
  id: string;
  schema: IApplicationSchema & {
    // 重写页面列表
    pages: Array<
      // 重写页面组件
      Omit<TypePageConfig, "component"> & {
        component: IComponentData;
      }
    >;
    // 重写数据集配置
    datasets: IDatasetData[];
  };
}

/**
 * 组件物料配置数据
 * @TODO 在业务中，组件数据可以进行关联，通过 ComponentBind 进行和实体绑定
 * 因此 Component 被重写为： ComponentEntity | ComponentBind
 */
export interface IComponentData extends IMetaData {
  id: string;
  schema: IComponentSchema & {
    // 重写 slots
    slots: Partial<{
      default: IComponentSchema[];
      [slotName: string]: IComponentSchema[];
    }>;
  };
}

// // 在业务中 Component 被定义为实体
// export interface ComponentEntity extends ComponentEntity {
//   type: "COMPONENT_ENTITY";
//   // 重写 slots
//   slots: Partial<{
//     default: (Component | ComponentBind)[];
//     [slotName: string]: (Component | ComponentBind)[];
//   }>;
// }
// export interface ComponentBind {
//   type: "COMPONENT_BIND";
//   componentId: string;
// }

/**
 * 基础组件数据
 */
export type IBaseComponentData = IComponentData;

/**
 * 低代码组件数据
 * @TODO 定义低代码组件
 */
export interface ILowCodeComponentData extends IMetaData {
  id: string;
  target: string;
}

/**
 * 数据集数据
 */
export interface IDatasetData extends IMetaData {
  id: string;
  schema: IDatasetSchema;
}

// 所有资源数据
export interface IResourceData {
  projects: IProjectConfigData[];
  datasets: IDatasetData[];
  components: IComponentData[];
}

/**
 * 物料数据
 */
export interface MaterialData {
  id: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  createdUser: string;
  updatedUser: string;
  /**
   * 收藏状态
   */
  collection: boolean;
  type: 1;
  category: string;
  schema: IMaterialSchema;
}
