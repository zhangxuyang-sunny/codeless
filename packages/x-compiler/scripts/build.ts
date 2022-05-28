import webpack from "webpack";
import merge from "webpack-merge";
import common from "../webpack/common";
import production from "../webpack/production";

const config = merge(common, production);

webpack(config, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  if (!stats) {
    console.log("webpack 无信息输出！");
    return;
  }
  console.log(
    stats.toString({
      chunks: false, // 使构建过程更静默无输出
      colors: true // 在控制台展示颜色
    })
  );
});
