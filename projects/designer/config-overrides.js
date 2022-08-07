/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const {
  override,
  addWebpackAlias,
  addBabelPlugin,
  fixBabelImports,
  removeModuleScopePlugin,
  addLessLoader,
  adjustStyleLoaders,
  babelInclude
} = require("customize-cra");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const ArcoDesign = "@arco-design/web-react";
const ArcoDesignIcon = "@arco-design/web-react/icon";

module.exports = override(
  removeModuleScopePlugin(), // 取消模块作用域检查
  // cra 默认只编译 src 目录，重写此配置增加 monorepo 路径
  babelInclude([
    path.resolve("src"), //
    path.resolve("../../core"),
    path.resolve("../../packages")
  ]),
  addWebpackAlias({
    src: resolve("src"),
    core: resolve("../../core"),
    packages: resolve("../../packages"),
    projects: resolve("../../projects")
  }),
  // arco-design 样式按需加载
  fixBabelImports(ArcoDesign, {
    libraryName: ArcoDesign,
    libraryDirectory: "es",
    camel2DashComponentName: false,
    style: true
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

  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      localIdentName: "[local]--[hash:base64:5]",
      modifyVars: {
        // 在less-loader@6 modifyVars 配置被移到 lessOptions 中
        "arcoblue-6": "#ee7934",
        "primary-6": "#ee7934"
      }
    }
  }),
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  })
);
