import type { Expression } from "./expression";

/**
 * 数据集协议
 * 描述一个原子数据集
 * @TODO 支持多种状态库
 */
export type Store = {
  // type: string;
  /**
   * 数据集运行时名称
   * @eg name: "aa"， dataset.aa.loading
   */
  name: string;
  /**
   * 定义数据集的方法
   */
  define: {
    state: Expression;
    actions: Array<{
      name: string;
      expression: Expression;
    }>;
  };
};
