# Installation

### System requirements

pub-server was developed with node.js on macOS, so that is the recommended environment.

The generator works under Windows as well, but there are known issues with the editor and the file system watcher on Windows.


### Global install

```sh
npm install -g pub-server
```

At this point you can run `pub` from the command line in any directory, to preview your `.md` files.

### Project-specific install

Instead of depending on a global install, you can add pub-server to your project's package.json.
This provides more granular control over which version of pub-server is being used.

```sh
npm install --save-dev pub-server
```

If you want to deploy pub-server onto a PaaS like Heroku, use a regular dependency
instead of a devDependency.

```sh
npm install --save pub-server
```

### Configuring scripts

You can also create script aliases for running pub with different options in your package.json E.g.

```json
"scripts": {
  "develop":  "pub",
  "generate": "pub -O",
  "static":   "pub -S out"
}
```

Now you can call `npm run develop` or `npm run generate` or `npm run static`.

See [](/command-line) for details.
