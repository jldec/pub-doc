# How it works

### tl;dr
All text-content lives in **markdown** fragments inside **text** files in one or more **sources**. Fragments in the same file are separated by a delimiter like

    ---- /page-1 ----

**pub-generator** compiles markdown fragments into javascript objects which are rendered to HTML by applying **handlebars templates**.


### sources
Sources are directories in your project or inside a theme package. Source directories are scanned, and new files picked up automatically when the source is read.

Handlebars templates live in files in sources just like markdown text. In fact, templates and markdown may live together in the same source file as long as each is clearly identified e.g. (simplified content)


    ---- /page-1 ----

    page1 markdown text...

    ---- /main-layout.hbs ----

    <html>{{{renderPage}}}</html>



### pages and fragments
There are 2 kinds of markdown content:

1. **pages** have a "normal" page url or href. e.g. `/pages/about-us`
2. **fragments** have an href with a fragment #id. e.g. `/blog/2014/year-in-review#conclusions`

The href may be specified in a header at the top of the markdown like the examples above or derived from the source path: E.g. a file `/md/pages/About Us.md` may become `/pages/about-us` assuming `/md` is the source.

Filenames are turned into urls by slugifying i.e. lowercasing and converting non-alphanumeric characters into hyphens.

In addition to having an href, all pages and fragments may acquire additional metadata from their markdown headers. E.g to set a title for the home page, add the following at the top of the index.md file.

    ---- / ----
    title: Introduction

    **pub-server** is a lightweight content management tool for publishing on the web


### templates and rendering
pub-server invokes compiled templates to render pages.

Page or fragment objects provide the input "context" for handlebars. E.g. If a template contains `{{title}}`, handlebars will look for a `.title` property on the current page or fragment object and insert the value of that property into the html output.

Template evaluation is performed in a nested manner

- The outer layout template will include a helper like `{{{renderPage}}}`
- This invokes an inner page template which may render the page markdown using `{{{html}}}` or it may iterate over page-fragments using a block helper like `{{{#eachFragmentHtml}}}...{{{/eachFragmentHtml}}}`

Templates may be explicitly specified. E.g. to use an outer template called `hero` instead of the default 'main-layout', specify `layout:hero` in the markdown header. Similarly, to use a page layout called `flow`, specify `template:flow` in the markdown header.


### loading
Before rendering (or every time a source is modified) the generator does:

- *read* text files in order from all (or just the modified) sources
- *pre-process* each file into one or more fragments
- *compile* .md fragments into arrays of javascript objects
- *compile* .hbs fragments into handlebars templates
- *emit* events which can trigger additional processing by plugins

Page-fragments are automatically attached to pages during compilation. This makes it easy for templates to iterate over the fragments in a page during rendering.
