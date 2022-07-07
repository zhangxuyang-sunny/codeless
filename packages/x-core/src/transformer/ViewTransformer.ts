import { IViewSchema, IViewConsumer } from "../types/view";
import { MaterialTransformer } from "./MaterialTransformer";

export class ViewTransformer {
  private id = "";
  private version = "";
  private title = "";
  private description = "";
  private readonly schema = new MaterialTransformer();

  setSchema(schema: IViewSchema) {
    this.id = schema.id;
    this.version = schema.version;
    this.title = schema.title;
    this.description = schema.description;
    this.schema.setSchema(schema.schema);
  }

  getSchema(): IViewSchema {
    return {
      id: this.id,
      version: this.version,
      title: this.title,
      description: this.description,
      schema: this.schema.getSchema()
    };
  }

  getConsumer(): IViewConsumer {
    return {
      id: this.id,
      version: this.version,
      title: this.title,
      description: this.description,
      schema: this.schema.getConsumer()
    };
  }
}
