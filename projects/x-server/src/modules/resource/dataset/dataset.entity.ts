import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IDatasetData } from "packages/x-core/src/types/manager";
import { JSFunction, JSExpression } from "packages/x-core/src/types/schemas/js-value";
import { IDatasetSchema } from "packages/x-core/src/types/schemas/project";
import { JSExpressionEntity, JSFunctionEntity } from "../component/component.entity";
import { ResourceMetaData } from "../entities/metadata.entity";

class DatasetSchemaVO implements IDatasetSchema {
  id: string;
  type: "pinia";
  name: string;
  @ApiProperty({ type: IntersectionType(JSFunctionEntity, JSExpressionEntity) })
  define: JSFunction | JSExpression;
}

export class DatasetVO extends ResourceMetaData implements IDatasetData {
  @ApiProperty({ type: DatasetSchemaVO })
  schema: DatasetSchemaVO;
}
