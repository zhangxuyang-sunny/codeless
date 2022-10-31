/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const {
  override,
  addWebpackAlias,
  addBabelPlugin,
  fixBabelImports,
  removeModuleScopePlugin,
  adjustStyleLoaders,
  babelInclude
} = require("customize-cra");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const ArcoDesign = "@arco-design/web-react";
const ArcoDesignIcon = "@arco-design/web-react/icon";

module.exports = override(
  config => {
    if (!config?.experiments) {
      config.experiments = {};
    }
    config.experiments.topLevelAwait = true;
    return config;
  },
  removeModuleScopePlugin(), // 取消模块作用域检查
  // cra 默认只编译 src 目录，重写此配置增加 monorepo 路径
  babelInclude([
    path.resolve("src"), //
    path.resolve("../../packages"),
    path.resolve("../../projects")
  ]),
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
      // 死代码消除
      ssr: false,
      minify: true,
      pure: true,
      namespace: "x",
      // 哪些文件名是没有意义的
      meaninglessFileNames: ["index", "styles"],
      // 转译标记为模板文字，将有价值的字节保留在您的包中
      transpileTemplateLiterals: false
    }
  ]),

  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  })
);
