import { StringSchema } from "../nodes/StringNode";
import { JSValue, JSValueSchema } from "../nodes/JSValueNode";
import { IDatasetsConsumer, IDatasetsSchema } from "../types/project";
import { FunctionNode } from "../nodes";

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
  private key = "";
  private readonly define = new FunctionNode();

  constructor(schema: IDatasetsSchema) {
    this.setSchema(schema);
  }

  setSchema(schema: IDatasetsSchema): this {
    this.key = schema.key;
    this.define.setSchema(schema.define);
    return this;
  }
  getSchema(): IDatasetsSchema {
    return {
      key: this.key,
      define: this.define.getSchema()
    };
  }
  getConsumer(): IDatasetsConsumer {
    return {
      key: this.key,
      define: this.define.getValue()
    };
  }
}
