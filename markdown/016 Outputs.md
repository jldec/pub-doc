# Outputs

`pub -O` generates a complete site including .html files generated from markdown, [](browser-scripts), and copies of [](static-files).

The output destination defaults to `./out`

Usually `pub-config` will contain a single `outputs` configuration with the path and any other output-specific settings.

```js
outputs: {
  path: './tgt',
  relPaths: true,
  fileMap: true,
  outputAliases: true,
  omitRoutes: ['/img'],
  fqImages: { route:'/img', url:'https://techxlab.github.io' }
  overrideOpts: {
    appUrl: 'https://www.fmctraining.com',
    production:true }
},
```

`path` overrides the default output destination directory

`relPaths` converts all internal URLs to relative paths. This is very helpful if you want to open the generated HTML files by opening them in a browser directly from the file system.

`omitRoutes` can be use to omit directories which a not required in the output e.g. image directories hosted at a different CDN endpoint.

`fqImages` specifies a route pattern for URLs which will be rewritten e.g. to point to a different host or CDN endpoint.

`overrideOpts` used to specify output-specific opts e.g. to generate production HTML from a non-production environment.

`fileMap` output a manifest of pages, statics, and scripts in `filemap.json`.

`outputAliases` output html files and filemap entries for aliases using a template called 'redirect' (not automatically provided) - useful for redirects on some static hosts like GitHub Pages.
