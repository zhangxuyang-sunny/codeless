import { Document } from "mongoose";
import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { database } from "config/database";
import { IComponentData, ComponentStatus } from "@lowcode/types";

export type ComponentDocument = IComponentData & Document;

@Schema({
  _id: false,
  id: false,
  timestamps: true,
  minimize: false
})
export class ComponentPO implements Omit<IComponentData, "createdAt" | "updatedAt" | "schema"> {
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

  @Prop({ type: Number, required: true })
  status: ComponentStatus;

  @Prop({ required: true, type: Object })
  schema: ComponentDocument["schema"] | null;

  @Prop({ required: true })
  createdUser: string;

  @Prop({ required: true })
  updatedUser: string;
}

export const ComponentModel: ModelDefinition = {
  name: ComponentPO.name,
  schema: SchemaFactory.createForClass(ComponentPO),
  collection: database.table_components
};
