React Fullstack Skeleton
========================

This skeleton project is meant to scaffold a typical fullstack React application.
The skeleton uses webpack and gulp to manage the build and provide a great
development experience. The frontend stack is React, react-router, and
Redux. All React changes are automatically hot reloaded
using [react-hot-loader][1]. Also, the backend server is automatically
restarted upon any changes using [nodemon][2].

Both the server and frontend code are built and transpiled using webpack, while
gulp is used primarily to start the webpack-dev-server and nodemon.

## Directory Structure

```
build/                  // webpack build output
  public/               //  publicly served assets
    index.html
    bundle.js           // frontend bundle  built w/ webpack
  server.js             // backend server   built w/ webpack
src/
  frontend/
    components/         // React components
    reducers/           // Redux reducers
    Root.js             // Root component defining Routes
    index.js            // React.render Root component
  server/
    index.js
gulpfile.babel.js
webpack.config.js
```

## Typical Usage

This skeleton was designed with typical use case of having a backend api serve
a React SPA. The skeleton automatically proxies all requests to `/api` thru
the webpack-dev-server to the backend server.

The frontend is automatically hot reloaded whenever you save a file. See
[react-hot-loader][1] for more details on how this works. It enables you to
immediately see changes in React components without losing application state
or having to reload your page!

The backend server is automatically restarted whenever you save a file.
If, for example, you modify the output of an api endpoint that your frontend
is displaying, then you will have to refresh your page to pull from the new
backend server (unless you are polling your backend already); however, you
are saved from having to stop/restart your backend server manually.

## Improvements

The following improvements need to be made:

  * Add a production build flag that removes source maps and minifies js/html.
  * Add loaders to support SASS and introduce a base stylesheet as an example.

I welcome pull requests, but I am trying to keep this skeleton relatively minimal.

[1]: http://gaearon.github.io/react-hot-loader/
[2]: http://nodemon.io/