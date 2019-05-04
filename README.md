# pub-doc

https://jldec.github.io/pub-doc/

This website is generated from markdown using [pub-server](https://jldec.github.io/pub-doc)

To edit the site locally, clone this repo, then
```sh
npm install
```

To preview at http://localhost:3001/ while you edit the markdown (using any editor).
```sh
pub
```

The browser preview will auto-reload whenever you save a file.

To generate a new set of html and copy static files into ./docs.
```sh
pub -O
```

To preview the generated static output at http://localhost:3001/
```sh
pub -S docs
```

The [gh-pages website](https://jldec.github.io/pub-doc) is published from the output in the `./docs` directory.

### credits
- https://github.com/sindresorhus/github-markdown-css
- https://github.com/LeaVerou/prism
