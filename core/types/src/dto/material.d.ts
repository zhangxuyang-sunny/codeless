import { IComponentMaterialSchema } from "@lowcode/schema/src";
export interface CreateComponentMaterialParams {
    title: string;
    description?: string;
    tags?: string;
    previews?: string[];
    zipFile?: File;
}
export interface UpdateComponentMaterialParams {
    id: string;
    title?: string;
    description?: string;
    previews?: string[];
    zipFile?: File;
    setterOptions: IComponentMaterialSchema["setterOptions"];
}
export interface FindComponentMaterialParams {
    id?: string;
    title?: string;
    description?: string;
    createdUser?: string;
    updatedUser?: string;
    createdTimeRange?: [number, number];
    updatedTimeRange?: [number, number];
}
