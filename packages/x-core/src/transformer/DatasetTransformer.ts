import { StringNode, StringSchema } from "../nodes/StringNode";
import { JSValue, JSValueNode, JSValueSchema } from "../nodes/JSValueNode";

export interface DatasetSchema {
  key: StringSchema;
  default: JSValueSchema;
}

export interface DatasetValue {
  key: string;
  default: JSValue;
}

// 数据集转换器
// 抽象出跨平台的数据集定义
// 不同的框架下根据数据协议自行解析数据集定义生成响应式数据
export class DatasetTransformer {
  private readonly id = new StringNode();
  private readonly default = new JSValueNode();

  setSchema(schema: DatasetSchema): this {
    this.id.setSchema(schema.key);
    this.default.setSchema(schema.default);
    return this;
  }
  getSchema(): DatasetSchema {
    return {
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
}
