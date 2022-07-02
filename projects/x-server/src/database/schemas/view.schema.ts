import { Document } from "mongoose";
import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { database } from "config/database";
import { IMaterialSchema } from "packages/x-core/src/types/material";
import { IViewSchema } from "packages/x-core/src/types/view";

export type ViewDocument = IViewSchema & Document;

@Schema({
  _id: false,
  id: false,
  timestamps: true
})
export class ViewSchema implements Omit<IViewSchema, "createdAt" | "updatedAt"> {
  @Prop({ select: false })
  _id?: string;
  @Prop({ select: false })
  __v?: string;
  @Prop({ required: true, unique: true })
  id: string;
  @Prop({ required: true })
  version: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  createUser: string;
  @Prop({ required: true })
  updateUser: string;
  @Prop({ required: true, type: Object })
  schema: IMaterialSchema;
}

export const viewSchema = SchemaFactory.createForClass(ViewSchema);

export const ViewModel: ModelDefinition = {
  name: ViewSchema.name,
  schema: viewSchema,
  collection: database.table_views
};
