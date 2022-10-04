import fs from "fs";
import path from "path";
import {
  Configuration,
  // ProgressPlugin,
  DllReferencePlugin
  // container
} from "webpack";
// import CopyWebpackPlugin from 'copy-webpack-plugin';
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {
  styleLoader,
  cssLoader,
  postcssLoader,
  lessLoader,
  sassLoader,
  stylusLoader,
  babelLoader
} from "./loaders";
import { PORT } from "./devServer";

const entryList: Array<Record<string, string>> = [];
function getEntryByDir(name: string) {
  const dir = `./src/${name}`;
  const entry = fs.readdirSync(dir).reduce<Record<string, string>>((prev, item) => {
    const filename = path.basename(item, path.extname(item));
    const filepath = `./${path.join(dir, item)}`;
    if (fs.statSync(filepath).isDirectory()) return prev;
    prev[path.join(name, filename)] = filepath;
    return prev;
  }, {});
  entryList.push(entry);
  return entry;
}

const config: Configuration = {
  name: "common",
  mode: "none",
  entry: {
    "packages/react/index": "./node_modules/react/index.js",
    "packages/react-dom/index": "./node_modules/react-dom/index.js",
    "packages/react-dom/client": "./node_modules/react-dom/client.js",
    "packages/@arco-design/web-react": "./node_modules/@arco-design/web-react/lib/index.js",
    "packages/@arco-design/web-react/icon": "./node_modules/@arco-design/web-react/icon/index.js",
    "components/common/VerticalLayout": "./src/components/common/VerticalLayout/index.tsx",
    ...getEntryByDir("components/arco"),
    ...getEntryByDir("components/common")
    // ...getEntryByDir("components/test")
  },
  // https://webpack.docschina.org/configuration/output/
  output: {
    clean: true,
    path: path.resolve("./dist"),
    filename: "[name].js",
    publicPath: `http://localhost:${PORT}/`,
    libraryTarget: "umd", // 关键🏆
    umdNamedDefine: true,
    chunkFilename: "[name].chunk.js"
    // hotUpdateChunkFilename: 'hmr/[id].hot-update.js',
    // hotUpdateMainFilename: 'hmr/runtime.[id].hot-update.json'
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
    extensions: [".tsx", ".ts", ".mjs", ".js", ".jsx", ".vue", ".json", ".wasm"],
    modules: ["node_modules"]
  },
  // https://webpack.js.org/configuration/experiments/#experimentsoutputmodule
  experiments: {
    topLevelAwait: true
    // outputModule: true
  },
  module: {
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
            test: /\.module\.\w+$/,
            use: [styleLoader, cssLoader, postcssLoader, stylusLoader]
          },
          {
            use: [styleLoader, cssLoader, postcssLoader, stylusLoader]
          }
        ]
      }
    ]
  },
  plugins: [
    new DllReferencePlugin({
      context: process.cwd(),
      manifest: path.join(__dirname, "../release.dll/packages.manifest.json")
    })
    // new ProgressPlugin((progress, msg, ...args) => {
    //   console.log(`${Math.ceil(progress * 100)}%`, msg, args);
    // })
    // new FriendlyErrorsWebpackPlugin({
    //   compilationSuccessInfo: {
    //     messages: ['You application is running here http://localhost:3000'],
    //     notes: ['Some additionnal notes to be displayed unpon successful compilation']
    //   },
    //   onErrors: function (severity, errors) {
    //     // You can listen to errors transformed and prioritized by the plugin
    //     // severity can be 'error' or 'warning'
    //   },
    //   // should the console be cleared between each compilation?
    //   // default is true
    //   clearConsole: true,

    //   // add formatters and transformers (see below)
    //   additionalFormatters: [],
    //   additionalTransformers: []
    // }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: 'public',
    //       to: 'dist',
    //       toType: 'dir',
    //       noErrorOnMissing: true,
    //       globOptions: {
    //         ignore: ['**/.DS_Store', 'public/index.html']
    //       },
    //       info: {
    //         minimized: true
    //       }
    //     }
    //   ]
    // }),
    // new ForkTsCheckerWebpackPlugin({
    //   typescript: {
    //     extensions: {
    //       vue: {
    //         enabled: true,
    //         compiler: '@vue/compiler-sfc'
    //       }
    //     },
    //     diagnosticOptions: {
    //       semantic: true,
    //       syntactic: false
    //     }
    //   }
    // }),
  ],
  externals: ["vue", "pinia", "vue-router", "@arco-design/web-vue", "ant-design-vue"]
};
export default config;
