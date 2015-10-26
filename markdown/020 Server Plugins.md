# Server Plugins

Server Plugins are npm modules which extend pub-server's built-in [Web Server features](web-server-configuration). A working example is [pub-pkg-google-oauth](https://github.com/jldec/pub-pkg-google-oauth).

Server plugins export a single function which receives an instance of the pubServer object. This function is called once at startup, providing a hook for the plugin to add routes etc.

For additional control over the sequencing of when routes are added, the server emits `init-app-first` before mounting pages, statics, and browser scripts and it emits `init-app-last` after those are mounted.

Server plugins are configured in pub-config

```js
opts.serverPlugins = [ './my-server-plugin' ];
```

## The pubServer object

```js
{
  opts:          // global opts object (including opts.log)
  app:           // express app
  generator:     // pub-generator
}
```

`pubServer` is an eventEmitter.
