import { Document } from "mongoose";
import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { database } from "config/database";
import { IMaterialOptionSchema } from "packages/x-core/src/types/material.d";
import { IViewSchema } from "packages/x-core/src/types/page";

export type ViewDocument = IViewSchema & Document;

@Schema({
  _id: false,
  id: false,
  timestamps: true,
  minimize: false
})
export class ViewPO implements Omit<IViewSchema, "createdAt" | "updatedAt"> {
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

  @Prop({ required: true, type: Object })
  material: IMaterialOptionSchema;

  @Prop({ required: true })
  createdUser: string;

  @Prop({ required: true })
  updatedUser: string;
}

export const ViewModel: ModelDefinition = {
  name: ViewPO.name,
  schema: SchemaFactory.createForClass(ViewPO),
  collection: database.table_views
};
