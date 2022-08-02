import path from "path";
import { defineConfig } from "@vue/cli-service";

export default defineConfig({
  transpileDependencies: true,
  publicPath: "/renderer/vue",
  outputDir: "../designer/public/renderer/vue",
  pages: {
    index: {
      entry: "src/entry-previewer.ts",
      filename: "index.html",
      title: "预览器"
    },
    simulator: {
      entry: "src/entry-simulator.ts",
      filename: "simulator.html",
      title: "模拟器"
    }
  },
  chainWebpack: config => {
    config.devServer.port(4000);
    config.devServer.headers({ "Access-Control-Allow-Origin": "*" });
  },
  configureWebpack: config => {
    config.resolve.alias.core = path.resolve("../../core");
    config.resolve.alias.packages = path.resolve("../../packages");
    config.resolve.alias.projects = path.resolve("../../projects");
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
