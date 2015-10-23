# Configuration with pub-config

By adding a `pub-config` file to a directory, you can control how pub-server processes files, rather than depending on defaults or command-line options. The `pub-config` for this documentation lives [here](https://github.com/jldec/pub-doc-src/blob/master/pub-config.js).

A directory with a `pub-config` can also be packaged as a pub-server package or theme and distributed via npm, making it available for re-use in other projects.


### options structure

`pub-config` exports a single javascript options object. E.g `options.sources` contains paths to all the sources for a generated site.

The main keys are listed below and each is documented on a separate page

- `pkgs:` [Packages and Themes](/packages-and-themes)
- `sources:` Paths to [Sources](/sources)
- `staticPaths:` Paths to [Static Files](/static-files)
- `browserScripts:` Generating [Browser Scripts](/browser-scripts)
- `generatorPlugins:` [Generator Plugins](/generator-plugins)
- `serverPlugins:` [Server Plugins](/server-plugins)
- `injectCss:`, `injectJs:` Injecting [CSS and JavaScript](/injecting-css-and-js)

Besides the main keys, additional options may be available depending on the active theme.


### JSON or JavaScript

You have the choice of using either a .json or .js file for configuration. If you use a .js file, export the options object using `module.exports`.

```js
var opts = module.exports = {};

opts.production  = process.env.NODE_ENV === 'production' };
opts.localhost   = !process.env.CLOUD;

opts.sources     = [...];
opts.staticPaths = [...];
opts.outputs     = opts.localhost ? [...] : null;

opts.pkgs        = ['pub-pkg-seo'];
if (process.env.AUTH) { opts.pkgs.push('pub-pkg-google-oauth'); }
```

The syntax for .json is stricter, and it is not possible to include conditional or imperative logic, but json is easier to manipulate from code. No explicit `export` is required for json files.

##### Canonical path options format

Path options (all the keys above) can be either strings or objects and single-values or arrays. Objects are required if one path has additional properties. Arrays are required when there are multiple paths. The following are equivalent.

```js
sources: './markdown'
sources: ['./markdown']
sources: { path:'./markdown' }
sources: [{ path:'./markdown' }]
```
