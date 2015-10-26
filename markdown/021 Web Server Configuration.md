# Web Server Configuration

`pub-server` can be deployed as a node.js Web server with built-in support for:

- Error handling and redirects
- Cookie sessions
- User request logging to session memory or redis
- System event logging to redis
- Access control lists and plugin-support for OAuth
- Static and generated files
- File-system watchers
- Websockets

The server is based on [express](http://expressjs.com/).

## Error handling

`pub-server` mounts a 404 'not-found' and a 500 'server-error' handler.

The 404 logic will be triggered if no pages, staticPaths, or browserScripts match the requested path. It returns an empty 404 status for requests with a non-html extension.

Not-found requests for paths with no extension, or with an html extension will be 302 redirected to the home page or the first page found, unless there is an explicit /404 page in the content. This results in a much better experience for `pub` when it is used to render say a directory containing just a single README.md

Server errors will result in a simple empty 500 status response unless there is an explicit /500 page in the content.

## Sessions

Sessions are automatically enabled. Please refer to  [express-session](https://github.com/expressjs/session) for configuration details.

Session options may be maintained in `opts.session` in `pub-config` E.g.

```js
opts.session =
{ cookie:            { secure: opts.production, maxAge: 60*60*1000 },
  saveUninitialized: true,
  rolling:           false,
  saveOldSessions:   true };
```

Session storage with with redis is enabled by setting `opts.redis` in `pub-config` and, if necessary, configuring the redis credentials via environment variables.

```
host: process.env.RCH // 'localhost'
port: process.env.RCP // 6379
auth: process.env.RCA // ''
```

## System logs

Modules in pub-server call a global 'opts.log(...)' provided by [logger-emitter](https://github.com/jldec/logger-emitter) to show warnings and errors on the console.

If you set `opts.redis._log = <key-name>`, the same events will be timestamped and logged into a [redis list](http://redis.io/topics/data-types-intro).

## Session logs

pub-server can record clicks and other events generated in the browser via the `/server/log/<path>?<params>` api.

HTTP requests sent to this endpoint will stored as objects containing the request path and parameters in the `session.log` and, if redis is enabled, automatically persisted with the session. E.g. a client with jQuery may use the following.

```
(function logReqeust() {
  $.getJSON('/server/log' + location.pathname + (location.search || ''));
}());
```

The default `/server/log` route can be configured by setting 'opts.session.logRequestPath'.
