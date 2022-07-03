/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const {
  override,
  addWebpackAlias,
  addBabelPlugin,
  fixBabelImports,
  removeModuleScopePlugin,
  addWebpackModuleRule
} = require("customize-cra");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const ArcoDesign = "@arco-design/web-react";
const ArcoDesignIcon = "@arco-design/web-react/icon";

module.exports = override(
  removeModuleScopePlugin(), // 取消模块作用域检查
  addWebpackAlias({
    src: resolve("src"),
    packages: resolve("../../packages"),
    projects: resolve("../../projects")
  }),
  // arco-design 样式按需加载
  fixBabelImports(ArcoDesign, {
    libraryName: ArcoDesign,
    libraryDirectory: "es",
    camel2DashComponentName: false,
    style: "css"
  }),
  // arc-design 图标按需加载
  fixBabelImports(ArcoDesignIcon, {
    libraryName: ArcoDesignIcon,
    libraryDirectory: "react-icon",
    camel2DashComponentName: false
  }),
  // 使 sc 在样式表中以文件名和组件名命名
  // https://styled-components.com/docs/tooling#babel-plugin
  addBabelPlugin([
    "babel-plugin-styled-components",
    {
      displayName: true,
      fileName: true,
      ssr: false,
      minify: true,
      pure: true,
      // namespace: "x",
      meaninglessFileNames: ["index", "styles"],
      transpileTemplateLiterals: false
    }
  ]),
  addWebpackModuleRule({
    test: /\.less$/,
    use: ["style-loader", "css-loader", "less-loader"]
  })
);
