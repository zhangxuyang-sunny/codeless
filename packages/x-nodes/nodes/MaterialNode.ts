import { v4 as uuid } from "uuid";
import { NodeTypes } from "../common/enums";
import { AbstractNode } from "../common/AbstractNode";
import { ArrayNode, ArraySchema } from "./ArrayNode";
import { ObjectNode, ObjectSchema } from "./ObjectNode";

declare global {
  interface NodeSchema {
    [NodeTypes.Material]: {
      schema: MaterialSchema;
      value: MaterialValue;
    };
  }
}

export interface MaterialSchema {
  type: NodeTypes.Material;
  id: string;
  key: string;
  title: string;
  version: string;
  src: string;
  style: ObjectSchema;
  commonProps: ObjectSchema;
  props: ObjectSchema;
  emits: ArraySchema;
  listeners: ArraySchema;
  slots: ObjectSchema;
}

export type MaterialEvent = `${string}:${string}` | string;
export type MaterialStyle = Partial<CSSStyleDeclaration>;
export type MaterialProps = { [x: string]: unknown };
export type MaterialCommonProps = {
  if?: unknown;
  show?: unknown;
  hidden?: unknown;
};
export type MaterialTarget =
  | [MaterialEvent, (...args: unknown[]) => unknown]
  | [MaterialEvent];
export type MaterialEmit = {
  event: MaterialEvent;
  target?: MaterialTarget[];
  invoke?: (...args: unknown[]) => unknown;
};
export type MaterialListener = {
  event: MaterialEvent;
  origin: string;
};

// 物料数据
export interface MaterialValue {
  id: string;
  key: string;
  title: string;
  version: string;
  src: string;
  style: MaterialStyle;
  props: MaterialProps;
  commonProps: MaterialCommonProps;
  emits: MaterialEmit[];
  listeners: MaterialListener[];
  slots: Partial<{
    default: MaterialValue[];
    [x: string]: MaterialValue[];
  }>;
}

// 物料节点
export class MaterialNode extends AbstractNode<NodeTypes.Material> {
  constructor() {
    super(NodeTypes.Material);
  }
  private id = uuid();
  private key = uuid();
  private title = "未命名组件";
  private version = "0.0.0";
  private src = "";
  private readonly style = new ObjectNode();
  private readonly props = new ObjectNode();
  private readonly commonProps = new ObjectNode();
  private readonly emits = new ArrayNode();
  private readonly listeners = new ArrayNode();
  private readonly slots = new ObjectNode();

  setId(id: string) {
    this.id = id;
    return this;
  }

  setKey(key: string) {
    this.key = key;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }
  setVersion(version: string) {
    this.version = version;
    return this;
  }

  setSchema(schema: MaterialSchema): this {
    this.id = schema.id;
    this.key = schema.key;
    this.version = schema.version;
    this.src = schema.src;
    if (schema.style.type === NodeTypes.Object) {
      this.style.setSchema(schema.style);
    }
    if (schema.props.type === NodeTypes.Object) {
      this.props.setSchema(schema.props);
    }
    if (schema.commonProps.type === NodeTypes.Object) {
      this.commonProps.setSchema(schema.commonProps);
    }
    this.emits.setSchema(schema.emits);
    this.listeners.setSchema(schema.listeners);
    this.slots.setSchema(schema.slots);
    return this;
  }

  getId(): string {
    return this.id;
  }

  getKey(): string {
    return this.key;
  }

  getTitle(): string {
    return this.title;
  }

  getVersion(): string {
    return this.version;
  }

  getSchema(): MaterialSchema {
    return {
      type: this.type,
      id: this.id,
      key: this.key,
      title: this.title,
      version: this.version,
      src: this.src,
      style: this.style.getSchema(),
      props: this.props.getSchema(),
      commonProps: this.props.getSchema(),
      emits: this.emits.getSchema(),
      listeners: this.listeners.getSchema(),
      slots: this.slots.getSchema()
    };
  }

  getValue(): MaterialValue {
    return {
      id: this.id,
      key: this.key,
      title: this.title,
      version: this.version,
      src: this.src,
      style: <MaterialValue["style"]>this.style.getValue(),
      props: <MaterialValue["props"]>this.props.getValue(),
      commonProps: <MaterialValue["commonProps"]>this.commonProps.getValue(),
      emits: <MaterialValue["emits"]>this.emits.getValue(),
      listeners: <MaterialValue["listeners"]>this.listeners.getValue(),
      slots: <MaterialValue["slots"]>this.slots.getValue()
    };
  }
}

AbstractNode.setParser(MaterialNode);
