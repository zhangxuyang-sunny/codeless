import { Document } from "mongoose";
import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProjectStatus } from "packages/x-core/src/enums";
import { ProjectConfig, ProjectConfigData } from "packages/x-core/src/types/manager";
import { database } from "config/database";

export type ProjectDocument = ProjectConfigData & Document;

@Schema({
  _id: false,
  id: false,
  timestamps: true,
  minimize: false
})
export class ProjectModelSchema implements Omit<ProjectConfigData, "createdAt" | "updatedAt"> {
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
  config: ProjectConfig;

  @Prop({ required: true, immutable: true })
  createdUser: string;

  @Prop()
  updatedUser: string;
}

// 用于 module.imports 注入数据库特征
export const ProjectModel: ModelDefinition = {
  name: ProjectModelSchema.name,
  schema: SchemaFactory.createForClass(ProjectModelSchema),
  collection: database.table_projects
};
