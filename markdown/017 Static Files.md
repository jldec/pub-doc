# Static files

### Serving static files with pub-server

When pub-server is running it will serve static files according to `opts.staticPaths` in `pub-config`.

```js
opts.staticPaths = [
{ path:   './img',
  route:  '/images',
  depth:  3,
  glob:   '**/*.{jpg,gif,png}' },

{ path:   './static',
  glob:   '**/*.{css,js}' } ];

opts.injectCss: [ '/css/stylesheet1.css', '/css/stylessheet2.css' ],
opts.injectJs: [ '/js/library1.js', '/js/library2.js' ],
```

This config will serve images located up to 3 levels under `./img` when browsers request urls starting with `/images/...`.

The config will also serve all `.js` and `.css` files located in '/static/js' and '/static/css', and explicitly inject 2 of each into the HTML using `opts.injectCss` and `opts.injectJs`.

The `.glob` [minimatch](https://github.com/isaacs/minimatch) pattern is used to test every file for matches.

The server ignores directories and files starting with `.` and `node_modules` unless they are explicitly served as single files (see below).

Static directories may exist inside [packages](/packages) like the [default doc theme](https://github.com/jldec/pub-theme-doc) and [pub-pkg-editor](https://github.com/jldec/pub-pkg-editor). This explains how [jQuery](https://github.com/jldec/pub-pkg-jquery) and other files are made available when you run `pub` on the command line.

HINT: To see which directories are being served, you can turn on console debug output just for statics by setting `DEBUG='pub:static'`. For a JSON list of all static files, query the server at `http://localhost:3001/admin/statics`.

If there is no `pub-config`,  pub-server will also serve static files from the first level of the current directory, or you can point to a directory containing static files with the command line `pub -s <dir>`. (note lower-case `s`)


### Static directory scan

Unlike [express](http://expressjs.com/) which reads the file system on each request, pub-server serves static files by scanning static paths on startup, and subsequently serving only those paths which were found in the scan. A watcher can be configured to trigger a re-scan of the path when new files arrive.

This allows pub-server to "mount" many static paths for all the included [](/packages), and to serve single files (like favicons) mounted on root, without stat'ing the file system on each path for each request

For more details see [`server/serve-statics.js`](https://github.com/jldec/pub-server/blob/master/server/serve-statics.js).


### Serving single files and injecting CSS or JS
A `staticPaths` entry can point either to a directory or to a single file.

The following will include all files under `./static` as well as 2 `dot` files necessary for GitHub Pages.

```js
staticPaths: [ './static', '.gitignore', '.nojekyll' ]
```

Adding `inject:true` on single file paths will inject a CSS `<link>` or JS `<script>` as in this example from [pub-theme-brief](https://github.com/jldec/pub-theme-brief).

staticPaths: [
  {path:'./css/brief.css', route:'/css', inject:true },
  {path:'./js/hammer.min.js', route:'/js', inject:true },
  {path:'./js/brief.js', route:'/js', inject:true }
]

### Publishing static files

`pub -O` will copy static files from all `staticPaths` to the output destination when a website is generated.

This behavior uses the same configuration with `depth` and `glob` patterns to prevent unnecessary files from being copied.

### Static-only mode

`pub -S <dir>` runs `pub-server` in static-only mode, serving ONLY static files from any directory. It mimics the behavior of GitHub Pages, looking for index.html files in folders, and redirecting from /folder-name to /folder-name/

This is especially useful for testing static HTML containing relative links. E.g. if `./out` holds your generated site and you do `pub -S .` you can navigate to `http://localhost:3001/out/` to test the site as if it were hosted in a subdirectory on the server.

See [](links) for details about configuring pub-server to generate relative links.
