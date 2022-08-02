import { ComponentStatus, ProjectStatus } from "./enums";
import { IApplicationSchema, IComponentSchema, IDatasetSchema, IMaterialSchema } from "@lowcode/schema";
export interface IMetaData {
    title: string;
    description: string;
    version: string;
    status: ProjectStatus | ComponentStatus;
    createdAt: string;
    updatedAt: string;
    createdUser: string;
    updatedUser: string;
}
/**
 * 项目配置没有组件、数据集等实体数据，它们都是通过 id 进行连接的，这样做的好处是：
 * 1. 项目配置和应用数据解耦，可以方便得进行版本切换
 * 2. 数据结构简单，便于看出项目中的结构
 * 通过 id 关联名下或团队下的页面、数据集等，最终通过 Transformer 处理转换得到应用 Application
 */
export interface IApplicationConfig {
    id: string;
    config: {
        router: {
            base: string;
            mode: "hash" | "history" | "memory";
            meta: Record<string, unknown>;
        };
        pages: Array<{
            id: string;
            component: {
                id: string;
                version: string;
            };
            title: string;
            name: string;
            path: string;
        }>;
        datasets: Array<{
            dataset: {
                id: string;
                version: string;
            };
            name: string;
        }>;
    };
    resource: {
        components: IComponentSchema[];
        datasets: IDatasetSchema[];
    };
}
export declare type TypeProjectConfig = IApplicationConfig["config"];
export declare type TypePageConfig = IApplicationConfig["config"]["pages"][number];
export declare type TypeRouterConfig = IApplicationConfig["config"]["router"];
export declare type TypeDatasetConfig = IApplicationConfig["config"]["datasets"][number];
export interface IProjectConfigData extends Omit<IApplicationConfig, "resource">, IMetaData {
}
/**
 * 应用配置数据
 * 通过 ProjectTransformer 处理生成 ApplicationData
 */
export interface IApplicationConfigData extends Omit<IApplicationConfig, "resource">, IMetaData {
    resource: {
        components: IComponentData[];
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
        pages: Array<Omit<TypePageConfig, "component"> & {
            component: IComponentData;
        }>;
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
        slots: Partial<{
            default: IComponentSchema[];
            [slotName: string]: IComponentSchema[];
        }>;
    };
}
/**
 * 基础组件数据
 */
export declare type IBaseComponentData = IComponentData;
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
export interface IResourceData {
    projects: IProjectConfigData[];
    datasets: IDatasetData[];
    components: IComponentData[];
}
/**
 * 物料数据
 */
export interface IMaterialData {
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
