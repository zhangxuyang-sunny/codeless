import path from "path";
import { Configuration, DllReferencePlugin } from "webpack";
import { VueLoaderPlugin } from "vue-loader";
import {
  styleLoader,
  cssLoader,
  postcssLoader,
  lessLoader,
  sassLoader,
  stylusLoader,
  vueLoader,
  babelLoader,
  pugPlainLoader,
  rawLoader
} from "./loaders";

const config: Configuration = {
  name: "common",
  mode: "none",
  entry: {},
  // https://webpack.docschina.org/configuration/output/
  output: {
    clean: true,
    path: path.resolve("./dist"),
    filename: "[name].js",
    libraryTarget: "umd", // 关键🏆
    umdNamedDefine: true,
    chunkFilename: "[name].chunk.js"
  },
  devtool: "source-map",
  // https://webpack.docschina.org/configuration/cache/
  cache: {
    type: "memory"
  },
  // https://webpack.docschina.org/configuration/stats/
  stats: {
    preset: "error-only"
  },
  resolve: {
    alias: {
      "@": path.resolve("./src")
    },
    extensions: [
      ".tsx",
      ".ts",
      ".mjs",
      ".js",
      ".jsx",
      ".vue",
      ".json",
      ".wasm"
    ],
    modules: ["node_modules"]
  },
  // https://webpack.js.org/configuration/experiments/#experimentsoutputmodule
  experiments: {
    topLevelAwait: true
    // outputModule: true
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.m?jsx?$/,
        resolve: {
          fullySpecified: false
        },
        use: [babelLoader]
      },
      {
        test: /\.ts$/,
        use: [
          babelLoader,
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ["\\.vue$"]
            }
          }
        ]
      },
      {
        test: /\.tsx$/,
        use: [
          babelLoader,
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsxSuffixTo: ["\\.vue$"]
            }
          }
        ]
      },
      {
        test: /\.(svg)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "img/[name].[hash:8][ext]"
        }
      },
      {
        test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
        type: "asset",
        generator: {
          filename: "img/[name].[hash:8][ext]"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset",
        generator: {
          filename: "media/[name].[hash:8][ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: "asset",
        generator: {
          filename: "fonts/[name].[hash:8][ext]"
        }
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [styleLoader, cssLoader, postcssLoader]
          },
          {
            resourceQuery: /\?vue/,
            use: [styleLoader, cssLoader, postcssLoader]
          },
          {
            test: /\.module\.\w+$/,
            use: [styleLoader, cssLoader, postcssLoader]
          },
          { use: [styleLoader, cssLoader, postcssLoader] }
        ]
      },
      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [styleLoader, cssLoader, postcssLoader, lessLoader]
          },
          {
            resourceQuery: /\?vue/,
            use: [styleLoader, cssLoader, postcssLoader, lessLoader]
          },
          {
            test: /\.module\.\w+$/,
            use: [styleLoader, cssLoader, postcssLoader, lessLoader]
          },
          {
            use: [styleLoader, cssLoader, postcssLoader, lessLoader]
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [styleLoader, cssLoader, postcssLoader, sassLoader]
          },
          {
            resourceQuery: /\?vue/,
            use: [styleLoader, cssLoader, postcssLoader, sassLoader]
          },
          {
            test: /\.module\.\w+$/,
            use: [styleLoader, cssLoader, postcssLoader, sassLoader]
          },
          {
            use: [styleLoader, cssLoader, postcssLoader, sassLoader]
          }
        ]
      },
      {
        test: /\.styl(us)?$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [styleLoader, cssLoader, postcssLoader, stylusLoader]
          },
          {
            resourceQuery: /\?vue/,
            use: [styleLoader, cssLoader, postcssLoader, stylusLoader]
          },
          {
            test: /\.module\.\w+$/,
            use: [styleLoader, cssLoader, postcssLoader, stylusLoader]
          },
          {
            use: [styleLoader, cssLoader, postcssLoader, stylusLoader]
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [vueLoader]
      },
      {
        test: /\.vue$/,
        resourceQuery: /type=style/,
        sideEffects: true
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /vue/,
            use: [pugPlainLoader]
          },
          { use: [rawLoader, pugPlainLoader] }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new DllReferencePlugin({
      context: process.cwd(),
      manifest: path.join(__dirname, "../release.dll/packages.manifest.json")
    })
  ],
  externals: [
    "vue",
    "pinia",
    "vue-router",
    "@arco-design/web-vue",
    "ant-design-vue"
  ]
};
export default config;
