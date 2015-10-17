# pub-doc

http://jldec.github.io/pub-doc/

This website is generated from markdown using [pub-server](http://jldec.github.io/pub-doc)

To edit the site locally, clone this repo, then
```sh
npm install
```

To preview at http://localhost:3001/ while you edit the markdown (using any editor).
```sh
npm run develop
```

The browser preview will auto-reload whenever you save a file.

To generate a new set of html and copy static files into ./out.
```sh
npm run generate
```

To preview the generated static output at http://localhost:3001/
```sh
npm run static
```

To publish to gh-pages, use a separate repo with just a `gh-pages` branch in the `./out` directory. To set this up the first time:

```bash
cd out
git init
git add -A
git commit -m 'first pub-server output'
git branch -m gh-pages
```

The last step above just renames the default "master" branch to "gh-pages".

Follow the normal process to create a new repo on Gitub and use the suggested commands for intializing that with an existing repo, _except_ when you `git push -u` the first time, replace "master" with "gh-pages".

```bash
git remote add origin https://github.com/<id>/<repo>.git
git push -u origin gh-pages
```

### credits
- https://github.com/sindresorhus/github-markdown-css
- https://github.com/LeaVerou/prism
