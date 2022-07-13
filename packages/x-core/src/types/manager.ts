import { ApplicationStatus } from "../enums";
import {
  ApplicationSchema,
  ComponentSchema,
  DatasetSchema
} from "./schemas/application";

// 资源管理
// 注意：这里是业务数据
// 注意：这里是业务数据
// 注意：这里是业务数据

// 资源的业务 meta 信息
export interface MetaData {
  meta: {
    // 唯一标识符
    id: string;
    // 当前语言下的标题
    title: string;
    // 当前语言下的描述
    description: string;
    // 参与运行时的名称
    name: string;
    // 版本号
    version: string;
    // 资源状态
    status: ApplicationStatus;
    // 创建时间
    createdAt: string;
    // 更新时间
    updatedAt: string;
    // 创建人
    createdUser: string;
    // 更新人
    updatedUser: string;
  };
}

/**
 * 项目配置没有组件、数据集等实体数据，它们都是通过 id 进行连接的，这样做的好处是：
 * 1. 项目配置和应用数据解耦，可以方便得进行版本切换
 * 2. 数据结构简单，便于看出项目中的结构
 * 通过 id 关联名下或团队下的页面、数据集等，最终通过 Transformer 处理转换得到应用 Application
 */
// 应用配置
export interface ApplicationConfig {
  id: string;
  router: {
    // 基础路径
    base: string;
    // 路由模式
    mode: "hash" | "history" | "memory";
  };
  // 页面列表
  pages: Array<{
    // 关联一个组件，在 ProjectData.resources.components 中匹配
    component: {
      id: string;
      version: string;
    };
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
  resource: {
    // 组件列表
    components: ComponentSchema[];
    // 数据集列表
    datasets: DatasetSchema[];
  };
}

/**
 * 项目配置数据
 * 通过 ProjectTransformer 处理生成 ApplicationData
 */
export interface ApplicationConfigData
  extends Omit<ApplicationConfig, "resource">,
    MetaData {
  resource: {
    // 组件列表
    components: ComponentData[];
    // 数据集列表
    datasets: DatasetData[];
  };
}

/**
 * 应用数据
 * 由 ProjectTransformer 解析 ProjectData 生成
 */
export interface ApplicationData extends ApplicationSchema, MetaData {
  // 重写页面列表
  pages: Array<
    // 重写页面组件
    Omit<ApplicationSchema["pages"][number], "component"> & {
      component: ComponentData;
    }
  >;
  // 重写数据集配置
  datasets: DatasetData[];
}

/**
 * 组件物料配置数据
 * 在业务中，组件数据可以进行关联，通过 ComponentBind 进行和实体绑定
 * 因此 Component 被重写为： ComponentEntity | ComponentBind
 */
export interface ComponentData extends ComponentSchema, MetaData {
  // 重写 slots
  slots: Partial<{
    default: ComponentData[];
    [slotName: string]: ComponentData[];
  }>;
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
export interface BaseComponentData extends ComponentData, MetaData {}

/**
 * 低代码组件数据
 * @TODO 定义低代码组件
 */
export interface LowCodeComponentData extends MetaData {
  target: string;
}

/**
 * 数据集数据
 */
export interface DatasetData extends DatasetSchema, MetaData {}

// 所有资源数据
export interface ResourceData {
  projects: ApplicationConfigData[];
  components: ComponentData[];
  datasets: DatasetData[];
}
