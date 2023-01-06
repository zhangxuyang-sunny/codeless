import {
  type Application,
  type Expression,
  type PlatformThis,
  resolveExpression,
  ApplicationSchemaBuilder
} from "../../../schema/src";

import { defineStore } from "pinia";
import { Context } from "../core/Context";

const context = new Context();

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
      options: Pick<
        PlatformThis,
        | "currentThis" //
        | "invokerThis"
        | "invokerArguments"
      >
    ) {
      return await resolveExpression({
        expression,
        expressionRefs: this.schema.expressions,
        functionRefs: this.schema.functions,
        platformThis: context.getContext({
          currentThis: options.currentThis,
          invokerThis: options.invokerThis,
          invokerArguments: options.invokerArguments
        })
      });
    }
  }
});
