# Configuration with `pub-config`

By adding a `pub-config` file to a directory, you can control how pub-server processes files, rather than depending on defaults or command-line options. The `pub-config` for this documentation lives [here](https://github.com/jldec/pub-doc-src/blob/master/pub-config.js).

A directory with a `pub-config` can also be packaged as a pub-server package or theme and distributed via npm, making it available for re-use in other projects.


### options structure

`pub-config` exports a single javascript options object. The main path options keys are listed below and each is documented on a separate page

- `pkgs:` [Packages and Themes](/packages-and-themes)
- `sources:` Paths to [Sources](/sources)
- `outputs:` Paths to [Outputs](/outputs)
- `staticPaths:` Paths to [Static Files](/static-files)
- `browserScripts:` Generating [Browser Scripts](/browser-scripts)
- `generatorPlugins:` [Generator Plugins](/generator-plugins)
- `serverPlugins:` [Server Plugins](/server-plugins)

Besides the main path options, the following core server and generator options are recognized.

```js
opts.production     // boolean (process.env.NODE_ENV === 'production')
opts.port           // override port (process.env.PORT || '3001')
opts.appUrl         // string - qualify URLs (process.env.APP)
opts.linkNewWindow  // boolean - add target="_blank" to external links
```

Additional options may be available depending on the active theme e.g for adding links to GitHub and copyright notices.

### JSON or JavaScript

You have the choice of using either a .json or .js file for configuration.

If you use a .js file, export the options object using `module.exports`. The following example shows how to generate different config options using environment variables.

```js
var opts = module.exports = {};

opts.cloud       = process.env.CLOUD;
opts.auth        = process.env.AUTH;

opts.pkgs        = ['pub-pkg-seo'];
if (opts.auth) { opts.pkgs.push('pub-pkg-google-oauth'); }

opts.sources     = [...];
opts.staticPaths = [...];
opts.outputs     = opts.cloud ? null : [...];
```

The syntax for .json is stricter, and it is not possible to include conditional logic, but json is easier to manipulate and re-serialize. No explicit `export` is required for json files.

##### Canonical path options format

Path options (all the keys above) can be either strings or objects and single-values or arrays. Objects are required if one path has additional properties. Arrays are required when there are multiple paths. The following are equivalent.

```js
sources: './markdown'
sources: ['./markdown']
sources: { path:'./markdown' }
sources: [{ path:'./markdown' }]
```

### Inspecting the config

To inspect the fully resolved options while pub-server is running, browse to `/admin/opts`.

`pub -C` will present a similar result on the command line.
