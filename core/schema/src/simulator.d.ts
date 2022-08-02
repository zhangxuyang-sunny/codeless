import { IComponentSchema } from "./project";
/**
 * 模拟器组件节点协议
 */
export interface SimulatorComponentNodeSchema extends IComponentSchema {
    /**
     * 锁定状态
     */
    isLock: boolean;
}
