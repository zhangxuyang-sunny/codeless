import { ApplicationBuilder } from "./application";
import { ComponentSchemaBuilder } from "./component";
import { JSExpressionSchemaBuilder, JSFunctionSchemaBuilder } from "./js-value";

export class SchemaBuilder {
  static get Application() {
    return new ApplicationBuilder();
  }
  static get Component() {
    return new ComponentSchemaBuilder();
  }
  static get JsExpression() {
    return new JSExpressionSchemaBuilder();
  }
  static get JsFunction() {
    return new JSFunctionSchemaBuilder();
  }
}

export default SchemaBuilder;
