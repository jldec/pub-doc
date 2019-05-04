# Browser Scripts

In addition to generating HTML from markdown, `pub-server` can bundle browser scripts using [browserify](https://github.com/substack/node-browserify).

This makes it easy to serve front-end scripts which `require()` npm modules just like node.js server-side code.

Browser scripts are served live, and also saved to output when a site is generated.

NOTE: Scripts that do not include other modules or don't require any transformation, are easier to serve as [](static-files).
