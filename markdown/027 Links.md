# Links

For content maintained in markdown, it is important not to have to worry about where that content is going to be hosted, or even which level of the site the content will live on, relative to other pages on the site.

For this reason all links inside the markdown should use a simple "rooted path" convention both for specifying the urls of pages, and for referencing other pages via links inside the markdown. Rooted paths start with '/' for the index page, and continue in a typical hierarchy below that. E.g.

```
/products/vendor-name/product-name
```

## Generating static HTML with links

Generating links for static HTML pages can be challenging, especially if the site is being hosted in a subdirectory on the server or if image links need to be rewritten to use a separate CDN endpoint.

E.g Content inside page1 may refer to page2 using a path like `/path/to/page2` but this will break if the running site lives at a url like `https://me.github.io/website-root/`

There are two approaches to solving this - both are automatable but ugly.

1. auto-prefix links with a root path like `/website-root/path/to/page2`
2. auto-prefix links with relative paths like '../../path/to/page2'

The current version of pub-server supports the 2nd approach to auto-prefix links originating in markdown with the correct relative paths. In `pub-config` this is configured per-output as follows:

```js
outputs: {
  path: './out',   // configure output directory
  relPaths: true   // auto-prefix links with relative paths
}
```

E.g if a markdown page `/posts/year/month/day.html` includes an image at `/static/images/me.jpg`, the generated img src will point to `../../../static/images/me.jpg`.

One benefit of using this approach is that the resulting tree of static html files can be hosted at any level. No prior knowledge of the destination directory name is required when the site is generated. This can be helpful for testing or cloning sites.


## Links to directories and trailing /

Unlike a file system, it is quite normal to have pages on a website with URLs which look like links to directories in the URL hierarchy. E.g. `/products/vendor-name/` may return a page about the vendor, and then each child page in the hierarchy could be a product from that vendor.

This raises the question of whether or not to include the trailing `/` in the URL at the directory level, and what to return when users browse to a URL without the `/`.

> Github Pages will automatically 301-redirect from the URL without the trailing '/' to the URL with the trailing '/' if there is a directory with that name, and it has an index.html file.

This means that if you are targeting Github Pages and you have directories in your site hierarchy, use the trailing '/' for naming those pages and for links pointing to those pages to avoid sending users to pages with redirects.

Pages which are NOT directories generally don't have a trailing '/'.

If you prefer you can even omit the trailing '/' on URLs which are directories. When pub-server generates static HTML output files, it will automatically figure out when to generate directories containing an index.html file, and when it can simply use a file called `<directory-name>.html` for the page.

_NOTE: Using the trailing '/' also affects the way browsers interpret relative links, since they effectively add another level to the hierarchy. E.g. a link like './pagename' will mean something different if it occurs inside the HTML of a page at '/directory' vs. a page at '/directory/'.  When pub-server is generating output with `relPaths`, it will figure out the right level for either case._

## Links in templates

Templates may include links to CSS stylesheets etc. For these to receive the same treatment as links in markdown the `{{relPath}}` helper should be used in front of the link e.g.

```html
<link rel="icon" href="{{relPath}}/img/favicon.ico" type="image/x-icon">
```

If the output has been configured with `relPaths:true`, this `{{relPath}}` helper will insert a './' or the correct number of levels of `../../` etc.

## Publishing with links to files/images on another server

A site may have links to assets in the local filesystem during development, but those links are then converted to fully qualified links on a different server when the site is published.

This may be configured using output configuration settings as follows.

```js
outputs: {
  path: './out',
  relPaths: true,

  // don't copy assets under /assets to /out
  omitRoutes: ['/assets'],

  // prefix /assets... with the specified url
  fqImages: { route:'/assets', url:'https://assets.example.com' }
}
```

These settings will auto-prefix any markdown links matching `fqImages.route` with the specified `fqImages.url` during conversion from markdown to HTML.

The same is made possible for links inside templates by wrapping the hardwired local paths with a `{{fixPath <path>}}` helper.

E.g.

```html
<a href="{{fixPath '/assets/document-abc.pdf'}}">Download</a>
```
