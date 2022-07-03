import { IViewSchema, IViewConsumer } from "../types/view";
import { MaterialTransformer } from "./MaterialTransformer";

export class ViewTransformer {
  private id = "";
  private version = "";
  private title = "";
  private description = "";
  private createdUser = "";
  private updatedUser = "";
  private createdAt = "";
  private updatedAt = "";
  private readonly schema = new MaterialTransformer();

  setSchema(schema: IViewSchema) {
    this.id = schema.id;
    this.version = schema.version;
    this.title = schema.title;
    this.description = schema.description;
    this.createdUser = schema.createdUser;
    this.createdAt = schema.createdAt;
    this.updatedUser = schema.updatedUser;
    this.updatedAt = schema.updatedAt;
    this.schema.setSchema(schema.schema);
  }

  getSchema(): IViewSchema {
    return {
      id: this.id,
      version: this.version,
      title: this.title,
      description: this.description,
      createdUser: this.createdUser,
      updatedUser: this.updatedUser,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      schema: this.schema.getSchema()
    };
  }

  getConsumer(): IViewConsumer {
    return {
      id: this.id,
      version: this.version,
      title: this.title,
      description: this.description,
      createdUser: this.createdUser,
      updatedUser: this.updatedUser,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      schema: this.schema.getConsumer()
    };
  }
}
