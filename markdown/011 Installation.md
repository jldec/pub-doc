# Installation

### System requirements

pub-server was developed with node.js or io.js on Mac OSX, so that is the recommended environment to run locally (for now).

A 1-click installer which eliminates the need to pre-install node.js and use the command-line is coming soon. Fixes for Windows support are also a high priority.


### Global install

```sh
npm install -g pub-server
```

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
