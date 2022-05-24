import { ProjectSchema } from '../x-nodes';

export type TypeProjectData = {
  id: string;
  version: string;
  title: string;
  schema: ProjectSchema;
};
