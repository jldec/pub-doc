# GitHub Pages

There are many ways to setup your repos for publishing on GitHub Pages. This discussion assumes that you are publishing on GitHub Pages by pushing a "Project" repo with a `gh-pages` branch as described [here](https://help.github.com/articles/user-organization-and-project-pages/).

## Recommended approach: _separate repo_

Most docs assume that you want to maintain your gh-pages with your source in one repo.

However, things get a lot simpler if you separate the repo which holds the source used to generate your site, from the "gh-pages" repo used to publish it on GitHub Pages.

- no switching branches and merging trees
- no empty gh-pages orphan branch to intialize
- no static content cluttering up your source repo
- and allow for sites generated from multiple source projects

## Publishing a new site to gh-pages

The following steps assume that you will use an `out` subdirectory in the root of the source project. Alternative paths can be configured using the `outputs` key in your pub-config.

To prevent the output files from being picked up as part of the source repo, add `/out/` to your `.gitignore` file.

The first time you run `pub -O` it will create an `out` directory for your html output and other assets.

Test the output by running `pub -S .` and then navigating to [http://localhost:3001/out/](http://localhost:3001/out/).

The `-S <path>` option runs pub-server as a static-only web server, emulating GitHub Pages. If you don't use a custom domain, this will also test the relative links in your html since your site on GitHub Pages will live under `https://<id>.github.io/<repo>/...`.

If [links](/links) are broken, make sure that your pub-config has an output with `relPaths` set. e.g

```js
outputs: {
  path: './out',
  relPaths: true
},
```

At this point it may also be useful to run `git status` in the root of your main project to make sure that the `out` directory is properly ignored. If not, add '/out/' to your `.gitignore` file.

When you are ready to publish a new GitHub Pages repo:

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

## Publishing updates

Updating the site on GitHub Pages requires no fancy git magic. Simply re-generate the output into the `out` directory using `pub -O` and then commit and push the changes to GitHub.
