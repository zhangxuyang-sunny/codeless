import { VueProjectSchema } from '../x-nodes/nodes-vue';
import { ReactProjectSchema } from '../x-nodes/nodes-react';

export type TypeProjectSchema =  VueProjectSchema | ReactProjectSchema;

export type TypeProjectData = {
  id: string;
  version: string;
  title: string;
  schema: TypeProjectSchema;
};
