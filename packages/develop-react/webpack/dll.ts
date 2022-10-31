import type { Configuration } from "webpack";
import path from "path";
import { DllPlugin } from "webpack";

const config: Configuration = {
  mode: "development",
  entry: {
    packages: [
      "react",
      "react-dom",
      "redux",
      "@arco-design/web-react/icon",
      "@arco-design/web-react"
    ]
  },
  output: {
    // clean: true,
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "../release.dll"),
    library: "[name]", // dll的全局变量名
    libraryTarget: "system"
  },
  plugins: [
    new DllPlugin({
      context: path.dirname(process.cwd()),
      name: "[name]", // dll的全局变量名
      path: path.join(__dirname, "../release.dll", "[name].manifest.json") // 描述生成的manifest文件
    })
  ]
};

export default config;
