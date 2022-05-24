import type { ComputedRef, VNodeProps } from 'vue';
import { v4 as uuid } from 'uuid';
import { NodeTypes } from '../enums';
import { AbstractNode } from '../AbstractNode';
import { ArrayNode, ArraySchema } from './ArrayNode';
import { ObjectNode, ObjectSchema } from './ObjectNode';
import { StringNode, StringSchema } from './StringNode';
import {
  ReactiveByPiniaNode,
  ReactiveByPiniaSchema,
} from './ReactiveByPiniaNode';

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
  id: StringSchema;
  key: StringSchema;
  title: StringSchema;
  version: StringSchema;
  src: StringSchema;
  style: ObjectSchema | ReactiveByPiniaSchema;
  commonProps: ObjectSchema | ReactiveByPiniaSchema;
  props: ObjectSchema | ReactiveByPiniaSchema;
  emits: ArraySchema;
  listeners: ArraySchema;
  slots: ObjectSchema;
}

export type MaterialEvent = `${string}:${string}` | string;
export type MaterialStyle = Partial<CSSStyleDeclaration>;
export type MaterialProps = VNodeProps & { [x: string]: unknown };
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
  style: ComputedRef<MaterialStyle> | MaterialStyle;
  props: ComputedRef<MaterialProps> | MaterialProps;
  commonProps: ComputedRef<MaterialCommonProps> | MaterialCommonProps;
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
  private readonly id = new StringNode().setValue(uuid());
  private readonly key = new StringNode().setValue(uuid());
  private readonly title = new StringNode().setValue('未命名组件');
  private readonly version = new StringNode().setValue('0.0.0');
  private readonly src = new StringNode();
  private style: ObjectNode | ReactiveByPiniaNode = new ObjectNode();
  private props: ObjectNode | ReactiveByPiniaNode = new ObjectNode();
  private commonProps: ObjectNode | ReactiveByPiniaNode = new ObjectNode();
  private readonly emits = new ArrayNode();
  private readonly listeners = new ArrayNode();
  private readonly slots = new ObjectNode();

  setId(id: string) {
    this.id.setValue(id);
    return this;
  }

  setKey(key: string) {
    this.key.setValue(key);
  }

  setTitle(title: string) {
    this.title.setValue(title);
    return this;
  }
  setVersion(version: string) {
    this.version.setValue(version);
    return this;
  }

  setSchema(schema: MaterialSchema): this {
    this.id.setSchema(schema.id);
    this.key.setSchema(schema.key);
    this.version.setSchema(schema.version);
    this.src.setSchema(schema.src);
    if (schema.style.type === NodeTypes.ReactiveByPinia) {
      this.style = new ReactiveByPiniaNode().setSchema(schema.style);
    } else if (schema.style.type === NodeTypes.Object) {
      this.style = new ObjectNode().setSchema(schema.style);
    }
    if (schema.props.type === NodeTypes.ReactiveByPinia) {
      this.props = new ReactiveByPiniaNode().setSchema(schema.props);
    } else if (schema.props.type === NodeTypes.Object) {
      this.props = new ObjectNode().setSchema(schema.props);
    }
    if (schema.commonProps.type === NodeTypes.ReactiveByPinia) {
      this.commonProps = new ReactiveByPiniaNode().setSchema(
        schema.commonProps,
      );
    } else if (schema.commonProps.type === NodeTypes.Object) {
      this.commonProps = new ObjectNode().setSchema(schema.commonProps);
    }
    this.emits.setSchema(schema.emits);
    this.listeners.setSchema(schema.listeners);
    this.slots.setSchema(schema.slots);
    return this;
  }

  getSchema(): MaterialSchema {
    return {
      type: this.type,
      id: this.id.getSchema(),
      key: this.key.getSchema(),
      title: this.title.getSchema(),
      version: this.version.getSchema(),
      src: this.src.getSchema(),
      style: this.style.getSchema(),
      props: this.props.getSchema(),
      commonProps: this.props.getSchema(),
      emits: this.emits.getSchema(),
      listeners: this.listeners.getSchema(),
      slots: this.slots.getSchema(),
    };
  }

  getValue(): MaterialValue {
    return {
      id: this.id.getValue(),
      key: this.key.getValue(),
      title: this.title.getValue(),
      version: this.version.getValue(),
      src: this.src.getValue(),
      style: <MaterialValue['style']>this.style.getValue(),
      props: <MaterialValue['props']>this.props.getValue(),
      commonProps: <MaterialValue['commonProps']>this.commonProps.getValue(),
      emits: <MaterialValue['emits']>this.emits.getValue(),
      listeners: <MaterialValue['listeners']>this.listeners.getValue(),
      slots: <MaterialValue['slots']>this.slots.getValue(),
    };
  }
}

AbstractNode.setParser(MaterialNode);
