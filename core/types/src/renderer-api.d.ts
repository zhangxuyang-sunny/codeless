import { IApplicationSchema } from "@lowcode/schema";
declare global {
    interface Window {
        __X_RENDERER_API__: {
            document: Document;
            updateRoute: (id: string) => void;
            updateSchema: (schema: IApplicationSchema) => void;
        };
    }
}
