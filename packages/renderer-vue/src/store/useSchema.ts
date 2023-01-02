import {
  type Application,
  type Expression,
  type PlatformThis,
  resolveExpression,
  ApplicationSchemaBuilder
} from "../../../schema/src";

import { defineStore } from "pinia";
import { context } from "../core/Context";

export default defineStore({
  id: "Application",
  state: () => ({
    schema: new ApplicationSchemaBuilder().end()
  }),
  actions: {
    setSchema(schema: Application) {
      this.schema = new ApplicationSchemaBuilder(schema).end();
    },

    // 包装一下 resolveExpression
    async resolveExpression(
      expression: Expression,
      options: Pick<PlatformThis, "currentArguments" | "currentThis">
    ) {
      return await resolveExpression({
        expression,
        expressionPool: this.schema.expressionPool,
        cloudFunctionPool: this.schema.cloudFunctionPool,
        platformThis: context.getContext({
          currentArguments: options.currentArguments,
          currentThis: options.currentThis
        })
      });
    }
  }
});
