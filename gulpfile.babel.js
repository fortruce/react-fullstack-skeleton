import gulp from 'gulp';
import webpack from 'webpack';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import express from 'express';
import nodemon from 'nodemon';
import path from 'path';
import request from 'request';

import configs from './webpack.config';
const [ frontendConfig, backendConfig ] = configs;

gulp.task('dev', () => {
  const compiler = webpack(frontendConfig);

  // const server = new WebpackDevServer(compiler, {
  //   contentBase: path.join(__dirname, 'build', 'public'),
  //   historyApiFallback: true,
  //   hot: true,
  //   proxy: {
  //     '*': 'http://localhost:8080'
  //   }
  // });

  const server = express();

  // proxy requests to api
  server.use('/api*', (req, res) => {
    request({
      // use req.originalUrl instead of req.path since mount point is removed
      // from req.path (ie: '/api*' will be removed from req.path)
      url: 'http://localhost:8080' + req.originalUrl,
      qs: req.query,
      method: req.method.toUpperCase()
    }).pipe(res);
  });

  server.use(WebpackDevMiddleware(compiler));
  server.use(WebpackHotMiddleware(compiler));

  server.listen(3000, 'localhost', (err) => {
    if (err)
      return console.log(err);
    console.log('webpack-dev-server listening on localhost:3000');
  });
});

gulp.task('backend-watch', () => {
  webpack(backendConfig).watch(100, (err) => {
    if (err)
      return console.log(err);
    nodemon.restart();
  });
});

gulp.task('server', ['backend-watch'], () => {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'build', 'server.js'),
    // do not watch any directory/files to refresh
    // all refreshes should be manual
    watch: ['foo/'],
    ext: 'noop',
    ignore: ['*']
  }).on('restart', () => {
    console.log('nodemon: restart');
  });
});

gulp.task('default', ['dev', 'server']);