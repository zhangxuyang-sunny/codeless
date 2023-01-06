import path from "path";
import { defineConfig } from "@vue/cli-service";

export default defineConfig({
  transpileDependencies: true,
  publicPath: "/renderer/vue",
  outputDir: "../../projects/designer/public/renderer/vue",
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
    config.devServer.port(3000);
    config.devServer.headers({ "Access-Control-Allow-Origin": "*" });
  },
  configureWebpack: config => {
    // config.devtool = "source-map";
    config.resolve.alias["packages"] = path.resolve("../");
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
