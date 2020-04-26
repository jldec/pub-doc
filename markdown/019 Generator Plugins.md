# Generator Plugins

Many pub-server packages rely on generator plugins, usually to provide specialized handlebars helpers.

Generator plugins are "universal" npm modules. They run in node.js, as well as in browsers.

Here is the `pub-config` entry from [pub-theme-doc](https://github.com/jldec/pub-theme-doc).

```js
generatorPlugins: './plugins/generator-plugin.js',
```

The file path follows the node.js `require(path)` convention of using relative paths for modules which are local files and bare names for installable npm modules.

Here is the [plugin](https://github.com/jldec/pub-theme-doc/blob/master/plugins/generator-plugin.js):

```js
module.exports = function(generator) {

  var u = generator.util;
  var opts = generator.opts;
  var hb = generator.handlebars;

  hb.registerHelper('navIcon', function(frame) {

    return hb.defaultFragmentHtml('/#navicon',
      '_!bars fw lg_',
      '<span class="icon">=</span>',
      frame);
  });

  hb.registerHelper('docTitle', function(frame) {
    var title = opts.docTitle || opts.pkgName || 'pub-server';
    var subTitle = opts.docSubTitle || '';

    return hb.defaultFragmentHtml('/#doctitle',
      '# [' + title + '](/)\n' + subTitle,
      '<h1><a href="/">' + u.escape(title) + '</a></h1>' + subTitle,
      frame);
  });

  hb.registerHelper('topMenu', function(frame) {
    var url = opts.github || hb.githubUrl();

    return hb.defaultFragmentHtml('/#topmenu',
      url ? '- [_!github lg fw_](' + url + ' "github")' : '',
      url ? '<ul><li><a href="' + url + '">github</a></li></ul>' : '',
      frame);
  });

}
```

Generator plugins are expected to export a single function which is called once at startup. The function is passed a single `generator` parameter which is an instance of `pub-generator`.

### Registering helpers

Plugins can register new helpers using the handlebars instance at `generator.handlebars`.

An interesting example is the generator plugin in [pub-pkg-font-awesome](https://github.com/jldec/pub-pkg-font-awesome) which, besides registering some helpers, also adds a plugin to `generator.marked` to extend the markdown syntax for emphasis/italics.

### Manipulating the generator page model

Plugins which need to manipulate the page content model after it has been loaded from source, can do so by hooking into a 'pages-ready' event emitted by the generator after loading source files and parsing all the markdown and templates

```js
generator.on('pages-ready', function() {
    decoratePages();
  });
```

Note that the `pages-ready` event will be triggered each time the server reloads sources e.g. when watching directories for changes.
