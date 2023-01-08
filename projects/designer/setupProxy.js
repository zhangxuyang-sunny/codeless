// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/renderer", {
      target: "http://localhost:4000", //服务器接口地址
      changeOrigin: true,
      pathRewrite: { "^/renderer": "" }
    })
  );
};
