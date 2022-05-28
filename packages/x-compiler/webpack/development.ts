import { Configuration, DefinePlugin } from "webpack";

const config: Configuration = {
  mode: "development",
  plugins: [
    new DefinePlugin({
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false"
    }),
    new DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"',
        BASE_URL: '"/"'
      }
    })
  ]
};

export default config;
