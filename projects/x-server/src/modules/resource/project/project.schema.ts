import { Document } from "mongoose";
import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { database } from "config/database";
import { ProjectStatus } from "packages/x-core/src/enums";
import { ProjectConfig, ProjectConfigData } from "packages/x-core/src/types/manager";

export type ProjectDocument = ProjectConfigData & Document;

@Schema({
  _id: false,
  id: false,
  timestamps: true,
  minimize: false
})
export class ProjectPO implements Omit<ProjectConfigData, "createdAt" | "updatedAt"> {
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

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  status: ProjectStatus;

  @Prop({ type: Object, required: true })
  config: ProjectConfig;

  @Prop({ required: true, immutable: true })
  createdUser: string;

  @Prop({ required: true })
  updatedUser: string;
}

// 用于 module.imports 注入数据库特征
export const ProjectModel: ModelDefinition = {
  name: ProjectPO.name,
  schema: SchemaFactory.createForClass(ProjectPO),
  collection: database.table_projects
};
