import AbstractNode, { ISchema, Schema } from "./AbstractNode";
import { SchemaTypes } from "./core";
import StringNode from "./StringNode";

const type = SchemaTypes.Router;

function isValid(schema: ISchema): schema is Schema<RouterNode> {
  return schema.type === type && ["mode", "routes"].every(k => k in schema);
}

export type RouterSchema = Schema<RouterNode>;

export default class RouterNode extends AbstractNode {
  protected readonly type = type;
  private mode = new StringNode<"hash" | "history">().setValue("hash");
  private routes: Array<{ name: StringNode; path: StringNode }> = [];

  static isValid = isValid;

  isValid(): boolean {
    return isValid(this.getSchema());
  }

  setMode(mode: typeof this.mode) {
    this.mode = mode;
    return this;
  }

  addRoute(route: typeof this.routes[number]) {
    this.routes.push(route);
    return this;
  }

  setSchema(schema: Schema<AbstractNode>): this {
    if (isValid(schema)) {
      this.mode.setSchema(schema.mode);
      schema.routes.push(...schema.routes);
    }
    return this;
  }

  getSchema() {
    return {
      type,
      mode: this.mode.getSchema(),
      routes: this.routes.map(route => ({
        name: route.name.getSchema(),
        path: route.path.getSchema()
      }))
    };
  }

  getValue() {
    return {
      mode: this.mode.getValue(),
      routes: this.routes.map(route => ({
        name: route.name.getValue(),
        path: route.path.getValue()
      }))
    };
  }
}
