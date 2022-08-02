import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IDatasetData } from "@lowcode/types";
import { IDatasetSchema, JSFunction, JSExpression } from "@lowcode/schema";
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
