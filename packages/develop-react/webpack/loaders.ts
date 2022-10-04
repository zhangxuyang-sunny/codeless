import path from "path";
import { RuleSetUseItem } from "webpack";

export const threadLoader: RuleSetUseItem = {
  loader: "thread-loader",
  // 有同样配置的 loader 会共享一个 worker 池
  options: {
    // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，
    // 在 require('os').cpus() 是 undefined 时回退至 1
    // workers: 2,

    // 一个 worker 进程中并行执行工作的数量
    // 默认为 20
    workerParallelJobs: 50,

    // 额外的 node.js 参数
    workerNodeArgs: ["--max-old-space-size=1024"],

    // 允许重新生成一个僵死的 work 池
    // 这个过程会降低整体编译速度
    // 并且开发环境应该设置为 false
    poolRespawn: false,

    // 闲置时定时删除 worker 进程
    // 默认为 500（ms）
    // 可以设置为无穷大，这样在监视模式(--watch)下可以保持 worker 持续存在
    poolTimeout: Infinity,

    // 池分配给 worker 的工作数量
    // 默认为 200
    // 降低这个数值会降低总体的效率，但是会提升工作分布更均
    poolParallelJobs: 50,

    // 池的名称
    // 可以修改名称来创建其余选项都一样的池
    name: "thread-pool"
  }
};

// SSR 有用
export const vueStyleLoader: RuleSetUseItem = {
  loader: "vue-style-loader",
  options: {
    sourceMap: false,
    shadowMode: false
  }
};

export const styleLoader: RuleSetUseItem = {
  loader: "style-loader"
};

export const cssLoader: RuleSetUseItem = {
  loader: "css-loader",
  options: {
    sourceMap: false,
    importLoaders: 2,
    modules: {
      localIdentName: "[local]",
      auto: () => true
    }
  }
};

export const postcssLoader: RuleSetUseItem = {
  loader: "postcss-loader",
  options: {
    sourceMap: false,
    postcssOptions: {
      plugins: [
        function () {
          /* omitted long function */
        }
      ]
    }
  }
};

export const lessLoader: RuleSetUseItem = {
  loader: "less-loader",
  options: {
    sourceMap: true
  }
};

export const stylusLoader: RuleSetUseItem = {
  loader: "stylus-loader",
  options: {
    sourceMap: false
  }
};

export const babelLoader: RuleSetUseItem = {
  loader: "babel-loader",
  options: {
    cacheCompression: false,
    cacheDirectory: path.resolve(".cache/.babel-cache")
    // cacheIdentifier: ''
  }
};

export const tsLoader: RuleSetUseItem = {
  loader: "ts-loader",
  options: {
    transpileOnly: true,
    happyPackMode: false
  }
};

export const sassLoader: RuleSetUseItem = {
  loader: "sass-loader",
  options: {
    sourceMap: false
  }
};
