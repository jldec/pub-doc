# Static files

### Serving static files with pub-server

When pub-server is running it will serve static files according to `opts.staticPaths` in `pub-config`.

This also applies to static directories inside [](/packages) including the [default theme](https://github.com/jldec/pub-theme-doc) and [editor](https://github.com/jldec/pub-pkg-editor) packages, which explains how [jQuery](https://github.com/jldec/pub-pkg-jquery) and other files are made available to serve your local README.md.

If there is no `pub-config`,  pub-server will also serve static files from the first level of the current directory, or you can point to a directory containing static files with the command line `pub -s <dir>`.

### Publishing static files

`pub -O` will copy static files from all `staticPaths` to the output destination when a website is generated.

This behavior can be controlled for each `staticPath` with `depth` and `glob` patterns to prevent unnecessary files from being copied.

```js
opts.staticPaths = [
{ path:   './static',
  depth:  3,
  glob:   '*.{jpg,gif,png}',
  watch:  opts.localhost }
];
```

### Static directory scan

Unlike [express](http://expressjs.com/) which reads the file system on each request, pub-server serves static files by scanning static paths on startup, and subsequently serving only those paths which were found in the scan. A watcher can be configured to trigger a re-scan of the path when new files arrive.

This allows pub-server to "mount" many static paths for all the included [](/packages), and to serve single files (like favicons) mounted on root, without stat'ing the file system on each path for each request

For more details see [the code](https://github.com/jldec/pub-server/blob/master/server/serve-statics.js).
