import path from "path";
import { defineConfig } from "@vue/cli-service";

export default defineConfig({
  transpileDependencies: true,
  publicPath: "/renderer/vue",
  outputDir: "../x-designer/public/renderer/vue",
  chainWebpack: config => {
    config.devServer.port(4000);
    config.devServer.headers({ "Access-Control-Allow-Origin": "*" });
  },
  configureWebpack: config => {
    config.resolve.alias.packages = path.resolve("../../packages");
    config.experiments = {
      topLevelAwait: true
    };
    config.devServer.devMiddleware = {
      writeToDisk: true
    };
    config.devServer.client = {
      overlay: {
        warnings: false,
        errors: true
      }
    };
  }
});
