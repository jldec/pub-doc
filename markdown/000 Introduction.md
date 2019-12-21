---- / ----
title: Introduction

# Introduction

[pub-server](https://github.com/jldec/pub-server), or __pub__ for short, is a static site generator and editor. Content is maintained in markdown, with the ability to compose output pages from multiple markdown fragments.

The following use-cases are supported:

- Command-line tool for generating static websites
- Web server for previewing generated HTML locally
- Web server deployed on a PaaS like Heroku

The generator+editor can also run in-browser, allowing non-technical users to edit and instantly preview the generated HTML, without first installing pub-server themselves.

By using markdown text fragments for managing content we are able to simplify the stack (no database to install) as well as provide users with all the benefits of modern tools like github for versioning and collaboration.

There is no need to compromise on site or page structure just because user content lives in "style-free" markdown -- with templates and a little bit of plugin code, any information design and HTML/CSS layout can be supported.

pub-server generates finished HTML by combining markdown fragments with clean and fully-extensible handlebars templates. This provides maximal decoupling of user content from developer code and designer presentation.

The generated output uses npm-installable themes and is fully customizable.

Let's try to make it fun again to build nice clean front-end designs that others can enjoy!
