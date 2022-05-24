import path from "path";
import { defineConfig } from "@vue/cli-service";

export default defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.devServer.port(4000);
    config.devServer.headers({ "Access-Control-Allow-Origin": "*" });
  },
  configureWebpack: config => {
    config.resolve.alias.packages = path.resolve("../");
    config.experiments = {
      topLevelAwait: true
    };
    config.devServer.client = {
      overlay: {
        warnings: false,
        errors: true
      }
    };
  }
});
