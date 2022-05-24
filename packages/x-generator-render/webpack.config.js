const path = require("path");

// const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
/**
 * @type {import("webpack").Configuration}
 */
const config = {
  mode: "development",
  entry: {
    editArea: "./src/index.vue",
    sortablejs: "./node_modules/sortablejs/Sortable.js"
  },
  output: {
    clean: true,
    path: path.join(__dirname, "../../public/x-generator-render"),
    filename: "[name].js",
    libraryTarget: "system" // 关键🏆
  },
  devServer: {
    port: "9090"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
      },
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
              plugins: ["@babel/plugin-transform-runtime", "@vue/babel-plugin-jsx"]
            }
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              happyPackMode: false,
              appendTsxSuffixTo: ["\\.vue$"]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              babelParserPlugins: ["jsx", "classProperties", "decorators-legacy"]
            }
          }
        ]
      }
    ]
  },
  devtool: "source-map",
  externals: ["vue", "sortablejs"],
  resolve: {
    extensions: [".js", ".ts", "tsx", "vue"],
    alias: {
      "@": path.join(__dirname, "./src")
    }
  },
  plugins: [new VueLoaderPlugin()]
};

// const compiler = webpack(config);

// compiler.watch(
//   {
//     // [watchOptions](/configuration/watch/#watchoptions) 示例
//     aggregateTimeout: 300,
//     poll: undefined
//   },
//   (error, status) => {
//     console.log(error, status);
//     console.log("编译完成");
//   }
// );
module.exports = config;
