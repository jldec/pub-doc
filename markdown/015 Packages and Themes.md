# Packages and Themes

pub-server may be extended with **Packages** some of which are **Themes**.

Packages are [npm](https://www.npmjs.com/about) modules with their own `pub-config`.

Themes include layout templates for building standalone websites. Most projects either include just one theme or they define their own layout. The theme for this documentation is [pub-theme-doc](https://github.com/jldec/pub-theme-doc).

## Consuming packages

Packages are consumed by pub-server projects, by including their names (or paths) in the `pkgs` key.

```js
  pkgs: [
    'pub-theme-doc',
    'pub-pkg-prism',
    'pub-pkg-font-awesome',
    'pub-pkg-seo'
  ],
```

For extra parameters, use `{ path:"name", ... }` instead of name strings like the example above.  

In order to use packages which are not included with `pub-server` they first have to be installed.

```
npm install --save <pkg-name>
```

This will add a reference to the latest released version of the package inside the `dependencies` list of your `package.json`.


#### Resolving paths

When you run `pub` from the command line, it looks for a `pub-config` file and invokes the [pub-resolve-opts](https://github.com/jldec/pub-resolve-opts) module.

This module resolves all paths relative to your project directory or, in the case of packages, relative to each package directory. It also merges the lists of paths from inside any included packages, making everything inside the package available to the parent project.

This mechanism allows pub-server packages to introduce their own `staticPaths`, `sources` etc. for re-use in your project.


## package nesting

pub-server packages may not recursively contain other pub-server packages. Any nested inner packages listed in a package-level `pub-config` will be ignored when the top-level package is consumed.

This limitation is intentional, because current web standards like HTML and CSS are not recursively composable. For example, since all CSS classes share one namespace, the CSS classes inside a nested package will leak out into the global namespace.

Of course pub-server packages may include (recursively) 3rd party npm modules as dependencies inside their own `package.json`.
