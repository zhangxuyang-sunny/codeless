import { Configuration, DefinePlugin } from "webpack";

const config: Configuration = {
  mode: "production",
  plugins: [
    new DefinePlugin({
      __VUE_PROD_DEVTOOLS__: "false"
    }),
    new DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
        BASE_URL: '"/"'
      }
    })
  ]
};

export default config;
