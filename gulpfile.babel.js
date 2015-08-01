import gulp from 'gulp';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import nodemon from 'nodemon';
import path from 'path';

import configs from './webpack.config';
const [ frontendConfig, backendConfig ] = configs;

gulp.task('dev', () => {
  new WebpackDevServer(webpack(frontendConfig), {
    contentBase: path.join(__dirname, 'build', 'public'),
    hot: true,
    historyApiFallback: true,
    proxy: {
      '*': 'http://localhost:8080'
    }
  }).listen(3000, 'localhost', (err, result) => {
    if (err)
      return console.log(err);
    console.log('webpack-dev-server listening on localhost:3000');
  });
});

gulp.task('backend-watch', () => {
  webpack(backendConfig).watch(100, (err, stats) => {
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