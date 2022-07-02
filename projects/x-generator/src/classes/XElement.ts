import { AbstractNode, MaterialSchema, NodeTypes, PageSchema } from "packages/x-core";
export default class XElement {
  constructor(private schema: MaterialSchema | PageSchema) {}
  /**
   *  获取原本schema的Id 每个组件生下来就会有一个唯一的id
   */
  get id() {
    return this.schema.id.value;
  }

  get isPageSchema(): boolean {
    return this.schema.type === NodeTypes.Page;
  }

  get title() {
    return this.schema.title.value;
  }

  slots: Record<string, XElement[]> = {};

  slotName: string | undefined;

  parent: XElement | null = null;

  /**
   * 通过路径设置schema的value key支持链路
   */
  setSchemaValueByPath(key: string, value: unknown) {}

  /**
   * 通过路径设置Node节点 一般用于更换node, 支持链路
   */
  setSchemaByPath(key: string, node: AbstractNode) {}

  /**
   * 获取本身的schema
   */
  getSchema() {
    return this.schema;
  }
}
