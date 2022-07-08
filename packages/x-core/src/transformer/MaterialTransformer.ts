import {
  IMaterialParamsSchema,
  IMaterialParamsConsumer
} from "../types/material";
import { ObjectNode } from "../nodes";

// 物料节点
export class MaterialTransformer {
  private id = "";
  private src = "";
  private readonly style = new ObjectNode();
  private readonly props = new ObjectNode();
  private emits: IMaterialParamsSchema["emits"] = [];
  private listeners: IMaterialParamsSchema["listeners"] = [];
  private slots: IMaterialParamsSchema["slots"] = {};

  constructor(schema?: IMaterialParamsSchema) {
    if (schema) this.setSchema(schema);
  }

  setSchema(schema: IMaterialParamsSchema): this {
    this.id = schema.id;
    this.src = schema.src;
    this.style.setSchema(schema.style);
    this.props.setSchema(schema.props);
    this.emits = schema.emits;
    this.listeners = schema.listeners;
    this.slots = schema.slots;
    return this;
  }

  getSchema(): IMaterialParamsSchema {
    return {
      id: this.id,
      src: this.src,
      style: this.style.getSchema(),
      props: this.props.getSchema(),
      emits: this.emits,
      listeners: this.listeners,
      slots: this.slots
    };
  }

  getEmits(): IMaterialParamsConsumer["emits"] {
    return this.emits.map((emit) => {
      return {
        event: emit.event,
        target: emit.target
        // invoke: emit.invoke ? new FunctionNode().setSchema(emit.invoke) : void 0
      };
    });
  }

  getSlots(): IMaterialParamsConsumer["slots"] {
    const slots = Object.entries(this.slots).reduce(
      (slotMap, [slotName, slots]) => {
        const slotValueList = slots.map((slot) =>
          new MaterialTransformer().setSchema(slot).getConsumer()
        );
        return slotMap.set(slotName, slotValueList);
      },
      new Map<string, IMaterialParamsConsumer[]>()
    );
    return Object.fromEntries(slots);
  }

  getConsumer(): IMaterialParamsConsumer {
    return {
      id: this.id,
      src: this.src,
      style: <IMaterialParamsConsumer["style"]>this.style.getValue(),
      props: <IMaterialParamsConsumer["props"]>this.props.getValue(),
      emits: this.getEmits(),
      listeners: this.listeners,
      slots: this.getSlots()
    };
  }
}
