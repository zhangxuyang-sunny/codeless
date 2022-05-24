import { NodeTypes } from '../enums';
import { AbstractNode } from '../AbstractNode';

declare global {
  interface NodeSchema {
    [NodeTypes.Map]: {
      schema: MapSchema;
      value: MapValue;
    };
  }
}

export interface MapSchema<T extends string = string> {
  type: NodeTypes.Map;
  iterable: [T, NodeSchemas][];
}

export type MapValue<T extends string = string> = Map<T, NodeValues>;

export class MapNode<T extends string = string> //
  extends AbstractNode<NodeTypes.Map, MapSchema<T>, MapValue<T>>
{
  constructor() {
    super(NodeTypes.Map);
  }
  private readonly iterable: MapSchema<T>['iterable'] = [];

  addIterable(iterable: [T, NodeSchemas]) {
    this.iterable.push(iterable);
  }

  setSchema(schema: MapSchema<T>) {
    schema.iterable.forEach((item) => this.addIterable(item));
    return this;
  }

  getSchema() {
    return {
      type: this.type,
      iterable: this.iterable,
    };
  }

  getValue() {
    const map = new Map<T, NodeValues>();
    this.iterable.forEach(([property, schema]) => {
      map.set(property, AbstractNode.parseValue(schema));
    });
    return map;
  }
}

AbstractNode.setParser(MapNode);
