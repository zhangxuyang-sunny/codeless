import { defineStore } from "pinia";
import { context } from "../core/Context";
import {
  type Application,
  type Expression,
  resolveExpression,
  ApplicationSchemaBuilder,
  PlatformThis
} from "../../../schema/src";

export default defineStore({
  id: "Application",
  state: () => ({
    schema: new ApplicationSchemaBuilder().end()
  }),
  actions: {
    setSchema(schema: Application) {
      this.schema = new ApplicationSchemaBuilder(schema).end();
    },
    async resolveExpression(
      expression: Expression,
      opt: Pick<PlatformThis, "currentArguments" | "currentThis">
    ) {
      context.currentArguments = opt.currentArguments;
      context.currentThis = opt.currentThis;
      return await resolveExpression({
        expression,
        expressionPool: this.schema.expressionPool,
        cloudFunctionPool: this.schema.cloudFunctionPool,
        platformThis: {
          currentArguments: opt.currentArguments,
          currentThis: opt.currentThis,
          store: context.store
        }
      });
    }
  }
});
