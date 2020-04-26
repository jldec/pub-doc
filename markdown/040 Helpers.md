# Helpers
The following handlebar helpers are included in
[pub-generator/helpers.js](https://github.com/jldec/pub-generator/blob/master/helpers.js)

HTML helpers should be enclosed in `{{{triple-braces}}}` to avoid html escaping.


## Markdown HTML

##### `{{{html <text>}}}`
Returns html for the markdown text or in the current page or fragment.

##### `{{{fragmentHtml <fragment>}}}`
Returns html for a named/referenced fragment.

##### `{{{html-noWrap}}}`
Returns html without the wrapper div - useful to prevent editing or for container-sensitive CSS

##### `{{{html-fq}}}`
Returns html with fully qualified images and links - useful for HTML exports.


## Layout helpers

##### `{{{renderPage}}}`
Renders the current page using the template specified in its markdown header (or `default`).

##### `{{{renderLayout}}}`
Renders the current page using its layout template - only used with 3-level template nesting.

##### `{{{injectCss}}}`
Injects CSS `<link>` elements for all themes and packages.

##### `{{{injectJs}}}`
Injects `<script>` elements for all themes and packages, as well as for editor and websockets when necessary.

##### `{{partial <template>}}`
Renders the specified template using the same page context as the current page - useful for composing templates



## Iterators
These are block helpers for repeated template blocks - usage: `{{#helper}}...{{/helper}}`

##### `{{#eachFragment <prefix>}}`
Iterates over page fragments starting with prefix. Prefix may be qualified with page url to reference the same fragment from layout templates which are shared across pages.

##### `{{#eachPage}}`
Iterates over all pages

##### `{{#eachPageWithTemplate <template>}}`
Iterates over all pages in the site with a specific template



## Conditional helpers
These are block helpers which run the template block once if the condition is met.
An {{else}} block may follow the first conditional block. E.g. `{{#ifHelper}}...{{else}}...{{/ifHelper}}`

##### `{{#ifeq <value1> <value2>}}`
Tests for value1 == value2.

##### `{{#ifnoteq <value1> <value2>}}`
Tests for value1 != value2.

##### `{{#ifOption <key>}}`
Tests for truthy opts.key.

##### `{{#ifDev}}`
Tests for !opts.production.



## Links and images
Becuase urls in links and images may be qualified differently depending on the hosting target or CDN,
it makes sense to wrap these in a helper, e.g. to make the image server configurable separately or to
enable hosting both with and without relative paths.

##### `{{relPath}}`
Returns relative path prefix for the current page or output file when output.relPaths is true (affects only static output HTML). Useful for qualifying hardwired CSS and JS links in layout templates.

##### `{{fixPath <href>}}`
Like {{relPath}} but also handles link rewriting on output with fqImages. Requires href string parameter.

##### `{{{linkTo <url> <text>}}}`
Returns link html for the specified url/text - useful when a url is maintained in page metadata.

##### `{{{pageLink}}}`
Returns link html for the current page or fragment - useful for auto-generating lists of links with block helpers.

##### `{{pageHref}}`
Returns just the (qualified or not) href for the current page or fragment - useful for constructing customized links.

##### `{{fqurl}}`
Returns the fully qualified url for the current page or fragment - useful for sitemaps.

##### `{{{next}}}`
Returns link to the next page at the same level in the URL hierarchy.

##### `{{{prev}}}`
Returns link to the previous page at the same level in the URL hierarchy.

##### `{{{image <src> <text> <title>}}}`
Returns properly qualified `<img src="src" alt="text" title="title">`. If no parameters are passed, this helper
will try to use `this.image` or `this.icon`. Text and title are optional.

## Page lists

#### `{{{pageTree <groupBy>, <defaultGroup>}}}`
Render nested ul-li structure starting at `/`, grouping by <groupBy>. Use <defaultGroup> if <groupBy> has no value. (groupBy and defaultGroup must either both be specified or no args passed). NOTE: result does not include root

## Simple string and number helpers

##### `{{title}}`
Returns current page name or title

##### `{{option <key>}}`
Returns opts.key

##### `{{fragmentID}}`
Returns current fragment id (without the leading `#`)

##### `{{mod}}`
Returns frame.data.index % n || 0 inside eachPage or eachFragment e.g. for generating style names.



## Escaping

##### `{{uqt <string>}}`
Returns url-escaped string

##### `{{{hbr <string>}}}`
Returns HTML-escaped string with HTMLified linebreaks

##### `{{csv <array or string>}}`
Returns string of comma separated values -- useful for summarizing form data from checkboxes

##### `{{csvqt <string>}}`
Returns string escaped for csv output (fixes commas and quotes)



## Date helpers
The following helpers use [date-plus](https://github.com/jldec/date-plus) to parse and format the input
If no input is provided the current date/time is used.

##### `{{dateTime <date>}}`
Returns date.format()

##### `{{shortDate <date>}}`
Returns date.format('m/d/yyyy')

##### `{{mediumDate <date>}}`
Returns date.format('mediumDate')

##### `{{longDate <date>}}`
Returns date.format('longDate')

##### `{{fullDate <date>}}`
Returns date.format('fullDate')

##### `{{xmlDateTime <date>}}`
Returns date.format('yyyy-mm-dd\'T\'HH:MM:ss')

##### `{{isoDateTime <date>}}`
Returns date.format('isoDateTime')



## Helper utility functions
The following functions are useful for writing additional helpers in a plugin.

##### `hb.relPath()`
Function form of {{relPath}}

##### `hb.fixPath(href)`
Function form of {{fixPath}}

##### `hb.hbp(<param>)`
Detects whether a parameter was passed to the helper and returns undefined if not.
Useful for variadic helpers E.g.

```js
hb.registerHelper('date', function(d, frame) {
  return u.date(hbp(d)).format('d mmmm, yyyy');
});
```

When `{{date}}` is used without additional parameters, handlebars will pass the frame
context to the helper function as the first parameter. Using hbp() detects this.

`hb` is a reference to generator.handlebars.
