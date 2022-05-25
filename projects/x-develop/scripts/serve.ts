import webpack from 'webpack';
import merge from 'webpack-merge';
import WebpackDevServer from 'webpack-dev-server';
import devServer from '../webpack/devServer';
import common from '../webpack/common';
import development from '../webpack/development';

const config = merge(common, development);

const compiler = webpack(config);
const server = new WebpackDevServer(devServer, compiler);

const runServer = async () => {
  console.log('Starting server...');
  await server.start();
};

runServer();
