import { ComponentSchema } from "./application";

/**
 * 模拟器组件节点协议
 */
export interface SimulatorComponentNodeSchema extends ComponentSchema {
  /**
   * 锁定状态
   */
  isLock: boolean;
  /**
   * @TODO 更多模拟器属性
   */
}
