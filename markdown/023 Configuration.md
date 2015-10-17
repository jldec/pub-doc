# Configuration with pub-config

By adding a `pub-config` file to a directory, you can control how pub-server processes files, rather than depending on defaults or command-line options. The `pub-config` for this documentation lives [here](https://github.com/jldec/pub-doc/blob/master/pub-config.js).

A directory with a `pub-config` can also be packaged as a pub-server package or theme and distributed via npm, making it available for re-use in other projects.

```js
module.exports = {

  // pub-server packages (npm modules) including themes
  pkgs:[],

  // paths to source markdown and templates
  sources:[],

  // paths to outputs
  outputs:[],

  // paths to static files or directories
  staticPaths:[],

  // paths to auto-browserified javascript
  browserScripts:[],

  // npm modules to extend server
  serverPlugins:[],

  // npm modules to extend generator - run in client and on server
  generatorPlugins:[],

  // paths to injected .css files
  injectCss:[],

  // paths to injected .js files
  injectJs:[],

}
```

You have the choice of using either a .json or .js file for configuration. If you use a .js file, export the options object using `module.exports`.
The syntax for .json is stricter, and it is not possible to include conditional logic, but json is easier to manipulate from code. No explicit `export` is required for json files.

#### Canonical path options format

Path options (all the keys above) can be either strings or objects and single-values or arrays. Objects are required if one path has additional properties. Arrays are required when there are multiple paths. The following are equivalent.

    sources: './markdown'

    sources: ['./markdown']

    sources: { path:'./markdown' }

    sources: [{ path:'./markdown' }]


## resoving paths in packages

When you run `pub` from the command line, it looks for a `pub-config` file and invokes the [pub-resolve-opts](https://github.com/jldec/pub-resolve-opts) module which resolves the paths relative to the config directory, and then merges and flattens the lists of paths from the `pub-config` files inside an included packages. This mechanism allows pub-server packages to introduce their own staticPaths, sources, etc. for re-use in your project. (Note, pub-server does not support recursive package nesting like npm.)
