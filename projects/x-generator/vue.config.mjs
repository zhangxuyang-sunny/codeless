import path from "path";
import { defineConfig } from "@vue/cli-service";

export default defineConfig({
  transpileDependencies: true,
  pages: {
    index: "./src/page/generator/main.ts",
    simulator: "./src/page/simulator/main.ts"
  },
  chainWebpack: config => {
    config.devServer.port(9527);
    config.devServer.headers({ "Access-Control-Allow-Origin": "*" });
  },
  configureWebpack: config => {
    config.resolve.alias.packages = path.resolve("../../packages");
    config.resolve.alias["@"] = path.resolve("./src");
    config.resolve.alias["@generator"] = path.resolve("./src/page/generator");
    config.resolve.alias["@simulator"] = path.resolve("./src/page/simulator");
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
