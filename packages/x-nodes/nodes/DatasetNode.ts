import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";
import { StringNode, StringSchema } from "./StringNode";
import { JSValue, JSValueNode, JSValueSchema } from "./JSValueNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Dataset]: {
      schema: DatasetSchema;
      value: DatasetValue;
    };
  }
}

export interface DatasetSchema {
  type: NodeTypes.Dataset;
  key: StringSchema;
  default: JSValueSchema;
}

export interface DatasetValue {
  key: string;
  default: JSValue;
}

// 数据集节点
// 抽象出跨平台的数据集定义
// 不同的框架下根据数据协议自行解析数据集定义生成响应式数据
export class DatasetNode extends AbstractNode<NodeTypes.Dataset> {
  private readonly id = new StringNode();
  private readonly default = new JSValueNode();

  setSchema(schema: DatasetSchema): this {
    this.id.setSchema(schema.key);
    this.default.setSchema(schema.default);
    return this;
  }
  getSchema(): DatasetSchema {
    return {
      type: this.type,
      key: this.id.getSchema(),
      default: this.default.getSchema()
    };
  }
  getValue(): DatasetValue {
    return {
      key: this.id.getValue(),
      default: this.default.getValue()
    };
  }
  constructor() {
    super(NodeTypes.Dataset);
  }
}
