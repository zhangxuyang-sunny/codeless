import { Document } from "mongoose";
import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { database } from "config/database";
import {
  IProjectSchema,
  IRouterOption,
  IDatasetsSchema
} from "packages/x-core/src/types/project";
import { ProjectStatus } from "packages/x-core/src/enums";

export type ProjectDocument = IProjectSchema & Document;

@Schema({ _id: false, id: false, timestamps: true, minimize: false })
export class ProjectPO implements Omit<IProjectSchema, "createdAt" | "updatedAt"> {
  @Prop({ select: false })
  _id?: string;

  @Prop({ select: false })
  __v?: string;

  @Prop({ required: true, immutable: true })
  id: string;

  @Prop({ type: String, required: true })
  version: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  status: ProjectStatus;

  @Prop({ type: Object, required: true })
  router: IRouterOption;

  @Prop({ type: Array, required: true })
  datasets: IDatasetsSchema[];

  @Prop({ required: true, immutable: true })
  createdUser: string;

  @Prop({ required: true })
  updatedUser: string;

  createdAt: string;

  updatedAt: string;
}

// 用于 module.imports 注入数据库特征
export const ProjectModel: ModelDefinition = {
  name: ProjectPO.name,
  schema: SchemaFactory.createForClass(ProjectPO),
  collection: database.table_projects
};
