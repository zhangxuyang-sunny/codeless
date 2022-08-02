/**
 * 物料协议：物料是所有可被重用的资源集合，包括组件物料、静态资源物料
 * 静态资源物料包括图片、声音、文件等，使用 mimeType 进行区分
 */
import { MimeType } from "file-type";
import { TypeMaterialPropOptions } from "./setters";
/**
 * 组件物料：组件是现代前端构成界面的主要单元，组件也是一种物料
 */
export interface IComponentMaterialSchema {
    type: "component";
    /**
     * 组件物料
     */
    title: string;
    /**
     * 组件物料描述
     */
    description: string;
    /**
     * 组件物料代码地址
     */
    src: string;
    /**
     * 预览图列表
     */
    snapshots: string[];
    /**
     * 配置设置器选项
     */
    setterOptions: {
        /**
         * 属性设置器配置列表
         */
        props: Array<TypeMaterialPropOptions>;
        /**
         * 事件监听列表
         */
        listeners: Array<{
            title: string;
            description: string;
            /**
             * 事件名称
             */
            event: string;
        }>;
        /**
         * 事件发射列表
         */
        emits: Array<{
            title: string;
            description: string;
            /**
             * 事件名称
             */
            event: string;
        }>;
        /**
         * 插槽列表
         */
        slots: Array<{
            title: string;
            description: string;
            /**
             * 插槽名称
             */
            slot: string;
        }>;
    };
}
/**
 * 低代码组件物料
 */
export interface ILowcodeComponentMaterialSchema {
    type: "lowcode-component";
    target: string;
}
/**
 * 静态资源物料
 * @TODO 待方案实现
 */
export interface IAssetsMaterialSchema {
    type: "assets";
    title: string;
    description: string;
    mimeType: MimeType;
    src: string;
}
export declare type IMaterialSchema = IComponentMaterialSchema | ILowcodeComponentMaterialSchema | IAssetsMaterialSchema;
