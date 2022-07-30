import { IApplicationSchema } from "./schemas/project";

declare global {
  interface Window {
    // 渲染器对外暴露 api
    __X_RENDERER_API__: {
      document: Document;
      updateRoute: (id: string) => void;
      updateSchema: (schema: IApplicationSchema) => void;
    };
  }
}
