import path from "path";
import { defineConfig } from "@vue/cli-service";

export default defineConfig({
  transpileDependencies: true,
  configureWebpack: config => {
    config.experiments = {
      topLevelAwait: true
    };
    config.resolve.alias.packages = path.resolve("../../packages");
    config.resolve.alias.projects = path.resolve("../../projects");
    // config.entry = {
    //   index: "./src/main.ts",
    //   editor: "./src/editor/Index.vue",
    // };
    // config.output.filename = "[name].js";
    // config.output.clean = true;
    // config.output.libraryTarget = "system";
    // config.devServer = {
    //   devMiddleware: {
    //     writeToDisk: true,
    //   },
    // };
  },
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: tag => /^micro-app/.test(tag)
        };
        return options;
      });
  }
});
