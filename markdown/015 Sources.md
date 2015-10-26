# Sources

`pub-server` uses content stored in sources to generate your site.

Most sources are directories in your project or inside a theme package. Source directories are scanned, and new files picked up automatically when the source is read.

File-system sources can be watched and automatically re-read when changes are detected.

## Source modules

In addition to the default file-system sources, pub-server supports pluggable npm modules which can read and write files from github, dropbox etc.

These are configured configuring `source.src` with the source module name E.g. 'pub-src-github'.

The source API is able to glob directories recursively, and return an ordered set of files, optionally matching a glob pattern.

For more information see [pub-src-fs](https://github.com/jldec/pub-src-fs) and
[pub-src-github](https://github.com/jldec/pub-src-gihub)

[pub-src-redis](https://github.com/jldec/pub-src-redis) can also serve as a cache for other sources.

Source modules are resolved and loaded by pub-resolve-opts at startup time.

## Markdown fragments

pub-server content is maintained in markdown fragments inside files which originate in sources.

Fragments in the same file are separated by a delimiter like

    ---- /page-1 ----

For an overview of why we use fragments see the blog post [pub-server Fragments](http://blog.pubblz.com/pub-server-fragments).


## Handlebars templates

Handlebars templates are also just files (or fragments) in sources. For templates, pub-server looks an `.hbs` extension.

Templates are the key to separating HTML from content stored in markdown, making the content maintainable by non-developers.

pub-server compiles and invokes specific templates when it generates each page in a site. The templates use built-in [](/helpers) to call javascript functions for things like page-variable interpolation and markdown rendering. Custom helpers can be defined using [](generator-plugins).


### Sample config

The sample below is used in a complex environment to run locally and on a Heroku server for staging. The hosted server uses a redis cache and pulls sources from GitHub.

```js
var ifLocal = opts.localhost;
var ghTest  = process.env.TEST_GH;

opts.sources = [

  { name:           'markdown',
    src:            (ifLocal && !ghTest) ? 'pub-src-fs' :    'pub-src-github',
    path:           (ifLocal && !ghTest) ? '../<repo>/md'  : '/md',
    repo:           '...',     // for pub-src-github
    glob:           '**/*.md',
    depth:          4,
    cache:          (ifLocal ? null : 'pub-src-redis'),
    leftDelim:      '----',
    rightDelim:     '',
    headerDelim:    '----',
    slugify:        {allow:'_'},
    writable:       true,
    fragmentDelim:  true },

  { name:           'templates',
    path:           './templates',
    compile:        'handlebars',
    cache:          ifLocal ? null : 'pub-src-redis' },

  { name:           'schedule',
    path:           '...',
    src:            'pub-src-http',
    cache:          (ifLocal ? null : 'pub-src-redis'),
    interval:       '20m',
    timeout:        '10s',
    type:           'JSON',
    log:            true }
];
```

#### notes:
- `source.writable` is required for the editor to save files back to the source.
- `source.name` enables use of `generator.sourcePage$[name]` in helpers.
- `leftDelim`, `rightDelim`, `headerDelim` customizes fragment header syntax.
- setting `source.compile` to 'handlebars'` forces all fragments to be treated as handlebars templates, irrespective of extensions.
- setting `source.type` to something other than 'FILE' causes the source to be treated as an opaque JSON object instead of an array containing file objects.
