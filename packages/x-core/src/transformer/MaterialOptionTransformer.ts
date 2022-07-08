import {
  IMaterialOptionSchema,
  IMaterialOptionConsumer
} from "../types/material";
import { ObjectNode } from "../nodes";

// 物料节点
export class MaterialOptionTransformer {
  private id = "";
  private src = "";
  private readonly style = new ObjectNode();
  private readonly props = new ObjectNode();
  private emits: IMaterialOptionSchema["emits"] = [];
  private listeners: IMaterialOptionSchema["listeners"] = [];
  private slots: IMaterialOptionSchema["slots"] = {};

  constructor(schema?: IMaterialOptionSchema) {
    if (schema) this.setSchema(schema);
  }

  setSchema(schema: IMaterialOptionSchema): this {
    this.src = schema.src;
    this.style.setSchema(schema.style);
    this.props.setSchema(schema.props);
    this.emits = schema.emits;
    this.listeners = schema.listeners;
    this.slots = schema.slots;
    return this;
  }

  getSchema(): IMaterialOptionSchema {
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

  getEmits(): IMaterialOptionConsumer["emits"] {
    return this.emits.map((emit) => {
      return {
        event: emit.event,
        target: emit.target
        // invoke: emit.invoke ? new FunctionNode().setSchema(emit.invoke) : void 0
      };
    });
  }

  getSlots(): IMaterialOptionConsumer["slots"] {
    const slots = Object.entries(this.slots).reduce(
      (slotMap, [slotName, slots]) => {
        const slotValueList = slots.map((slot) =>
          new MaterialOptionTransformer().setSchema(slot).getConsumer()
        );
        return slotMap.set(slotName, slotValueList);
      },
      new Map<string, IMaterialOptionConsumer[]>()
    );
    return Object.fromEntries(slots);
  }

  getConsumer(): IMaterialOptionConsumer {
    return {
      id: this.id,
      src: this.src,
      style: <IMaterialOptionConsumer["style"]>this.style.getValue(),
      props: <IMaterialOptionConsumer["props"]>this.props.getValue(),
      emits: this.getEmits(),
      listeners: this.listeners,
      slots: this.getSlots()
    };
  }
}
