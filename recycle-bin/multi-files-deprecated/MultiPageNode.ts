import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";
import PageNode from "./PageNode";
import PiniaNode from "./PiniaNode";
import RouterNode from "./RouterNode";

const type = SchemaTypes.MultiPage;

function isValid(schema: ISchema): schema is Schema<MultiPageNode> {
  return schema.type === type && ["router", "piniaList", "pageList"].every(k => k in schema);
}

export default class MultiPageNode extends AbstractNode {
  protected readonly type = type;
  private readonly router = new RouterNode();
  private readonly piniaList: PiniaNode[] = [];
  private readonly pageList: PageNode[] = [];

  static isValid = isValid;

  isValid() {
    return isValid(this.getSchema());
  }

  addPinia(piniaSchema: Schema<PiniaNode>) {
    this.piniaList.push(new PiniaNode().setSchema(piniaSchema));
  }

  addPage(pageSchema: Schema<PageNode>) {
    this.pageList.push(new PageNode().setSchema(pageSchema));
  }

  setSchema(schema: Schema<MultiPageNode>) {
    if (isValid(schema)) {
      this.router.setSchema(schema.router);
      schema.piniaList.forEach(item => {
        this.addPinia(item);
      });
      schema.pageList.forEach(item => {
        this.addPage(item);
      });
    }
    return this;
  }

  getSchema() {
    return {
      type,
      router: this.router.getSchema(),
      piniaList: this.piniaList.map(item => item.getSchema()),
      pageList: this.pageList.map(item => item.getSchema())
    };
  }

  getValue() {
    return {
      router: this.router.getValue(),
      piniaList: this.piniaList.map(item => item.getValue()),
      pageList: this.pageList.map(item => item.getValue())
    };
  }
}
