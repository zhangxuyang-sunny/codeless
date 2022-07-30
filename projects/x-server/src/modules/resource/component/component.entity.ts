import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IComponentData } from "packages/x-core/src/types/manager";
import { JSFunction, JSExpression } from "packages/x-core/src/types/schemas/js-value";
import { IComponentSchema } from "packages/x-core/src/types/schemas/project";
import { ResourceMetaData } from "../entities/metadata.entity";

export class JSExpressionEntity implements JSExpression {
  type: "JSExpression";
  value: string;
  reactive: boolean;
}
export class JSFunctionEntity implements JSFunction {
  type: "JSFunction";
  value: string;
  useStrict: boolean;
}

type Emit = IComponentSchema["emits"][number];
class EmitEntity implements Emit {
  event: string;
  target: string[];
  invoke: JSFunctionEntity;
}

type Listener = IComponentSchema["listeners"][number];
class ListenerEntity implements Listener {
  event: string;
  target: string;
}

class ComponentSchemaVO extends ResourceMetaData implements IComponentSchema {
  id: string;
  src: string;
  @ApiProperty({ type: Object })
  props: Record<string, JSFunctionEntity | JSExpressionEntity>;
  @ApiProperty({ type: IntersectionType(String, JSExpressionEntity) })
  className: string | JSExpressionEntity;
  css: string;
  @ApiProperty({ type: IntersectionType(Object, JSExpressionEntity) })
  style: JSExpressionEntity | Partial<Record<keyof CSSStyleDeclaration, JSExpressionEntity>>;
  emits: EmitEntity[];
  listeners: ListenerEntity[];
  @ApiProperty({ type: Object })
  slots: Partial<{
    [slotName: string]: ComponentSchemaVO[];
    default: ComponentSchemaVO[];
  }>;
}

export class ComponentVO extends ResourceMetaData implements IComponentData {
  schema: ComponentSchemaVO;
}
