import type { TypeArray, TypeObject } from './data';
import type { TypeMaterialSchema } from './material';

// 路由描述
export type TypeRouterDescriptor = {
  history: 'hash' | 'history';
  routes: TypeArray;
};

// 资料库描述
export type TypeDatasetDescriptor = Record<string, TypeObject>;

// 应用描述，一个应用
export type TypeAppDescriptor = Record<string, TypeMaterialSchema>;

// 运行时描述协议
export type TypeRuntimeSchema = {
  router: TypeRouterDescriptor;
  dataset: TypeDatasetDescriptor;
  app: TypeAppDescriptor;
};
