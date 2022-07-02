import { IMaterialSchema, IMaterialConsumer } from "../types/material";
import { ObjectNode } from "../nodes";

// 物料节点
export class MaterialTransformer {
  private src = "";
  private readonly style = new ObjectNode();
  private readonly props = new ObjectNode();
  private emits: IMaterialSchema["emits"] = [];
  private listeners: IMaterialSchema["listeners"] = [];
  private slots: IMaterialSchema["slots"] = {};

  constructor(schema?: IMaterialSchema) {
    if (schema) this.setSchema(schema);
  }

  setSchema(schema: IMaterialSchema): this {
    this.src = schema.src;
    this.style.setSchema(schema.style);
    this.props.setSchema(schema.props);
    this.emits = schema.emits;
    this.listeners = schema.listeners;
    this.slots = schema.slots;
    return this;
  }

  getSchema(): IMaterialSchema {
    return {
      src: this.src,
      style: this.style.getSchema(),
      props: this.props.getSchema(),
      emits: this.emits,
      listeners: this.listeners,
      slots: this.slots
    };
  }

  getEmits(): IMaterialConsumer["emits"] {
    return this.emits.map((emit) => {
      return {
        event: emit.event,
        target: emit.target
        // invoke: emit.invoke ? new FunctionNode().setSchema(emit.invoke) : void 0
      };
    });
  }

  getSlots(): IMaterialConsumer["slots"] {
    const slots = Object.entries(this.slots).reduce(
      (slotMap, [slotName, slots]) => {
        const slotValueList = slots.map((slot) =>
          new MaterialTransformer().setSchema(slot).getConsumer()
        );
        return slotMap.set(slotName, slotValueList);
      },
      new Map<string, IMaterialConsumer[]>()
    );
    return Object.fromEntries(slots);
  }

  getConsumer(): IMaterialConsumer {
    return {
      src: this.src,
      style: <IMaterialConsumer["style"]>this.style.getValue(),
      props: <IMaterialConsumer["props"]>this.props.getValue(),
      emits: this.getEmits(),
      listeners: this.listeners,
      slots: this.getSlots()
    };
  }
}
