import type { Configuration } from "webpack-dev-server";

export const PORT = 7890;

// https://webpack.docschina.org/configuration/dev-server/
const devServer: Configuration = {
  port: PORT,
  hot: true, // 当遇到非局部刷新时候改为 only 和开启 client.progress 来 debug
  headers: {
    // 使跨域，便于调试
    "Access-Control-Allow-Origin": "*"
  },
  // liveReload: true,
  client: {
    overlay: {
      warnings: false,
      errors: true
    },
    logging: "verbose",
    progress: false
  },
  static: {
    directory: "dist",
    publicPath: "/static"
  },
  devMiddleware: {
    writeToDisk: true
  }
};

export default devServer;
