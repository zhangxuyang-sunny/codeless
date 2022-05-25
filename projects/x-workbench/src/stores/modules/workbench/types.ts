import type { RouterSchema, PageSchema } from "packages/x-nodes";
import type { TypeMaterialSchema, TypeMaterialSlotSchema } from "packages/x-types/material";

export type TypeWorkbenchState = {
  materialSelect: TypeMaterialSchema | null;
  slotSelect: TypeMaterialSlotSchema | null;
};

export type TypeRouterPageState = {
  routerSchema: RouterSchema;
  pageSchemaList: PageSchema[];
};
