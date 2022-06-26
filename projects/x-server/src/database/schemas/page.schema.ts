import { Document } from "mongoose";
import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { database } from "config/database";
import { PageSchema } from "packages/x-nodes/index";
import { PagePO } from "../modal/page";

export type PageDocument = PageDO & Document;

@Schema()
export class PageDO implements PagePO {
  @Prop({ required: true })
  vid: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  version: string;
  @Prop()
  createUser: string;
  @Prop()
  updateUser: string;
  @Prop({ type: Object, required: true })
  schema: PageSchema;
}

export const PageDOSchema = SchemaFactory.createForClass(PageDO);

export const PageFeature: ModelDefinition = {
  name: PageDO.name,
  schema: PageDOSchema,
  collection: database.table_pages
};
