/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
  // externals: ["fsevents"]
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader"
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheCompression: false
              // cacheDirectory: path.resolve(".cache/.babel-cache")
              // cacheIdentifier: ''
            }
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ["\\.vue$"]
            }
          }
        ]
      }
    ]
  }
};
