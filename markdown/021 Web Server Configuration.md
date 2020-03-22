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

The server is based on [express](https://expressjs.com/).

## Error handling

`pub-server` mounts a 404 'not-found' and a 500 'server-error' handler.

The 404 logic will be triggered if no pages, staticPaths, or browserScripts match the requested path. It returns an empty 404 status for requests with a non-html extension.

Not-found requests for paths with no extension, or with an html extension will be 302 redirected to the home page or the first page found, unless there is an explicit /404 page in the content. This results in a much better experience for `pub` when it is used to render say a directory containing just a single README.md

Server errors will result in a simple empty 500 status response unless there is an explicit /500 page in the content.

## Sessions

Sessions are automatically enabled. Please refer to  [express-session](https://github.com/expressjs/session) for configuration details.

Session options may be maintained in `opts.session` in `pub-config`. For details of available options see [express-session](https://github.com/expressjs/session#options). Default values are listed below; a value for `session.secret` (or `process.env.SSC`) is required when sessions are persisted in redis.

```js
opts.session =
  { name: 'pss',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    secret: process.env.SSC || (!resisOpts && u.str(Math.random()).slice(2)),
    cookie: { secure:opts.production, maxAge:60*60*1000 } }
```

Session storage with with redis is enabled by setting `opts.redis` in `pub-config` and, if necessary, configuring the redis credentials via environment variables. See [node-redis](https://github.com/NodeRedis/node-redis#options-object-properties) for configuration options.

```js
opts.redis =
{ prefix: 'pub-test-auth:', // prefix all keys (sessions and logs)
  _sess:  'session:',       // capture sessions using keys <prefix><_sess><sid>
  _log:   'log:' };         // capture system logs using list key <prefix><_log> (see below)
```

To configure redis using environment variables:

```sh
export RCH=localhost # host: default = localhost, can also be configured via opts.redis.host
export RCP=6379      # port: default = 6379, can also be configured via opts.redis.port
export RCA=xxx       # auth_pass: default blank, can only be configured via environment
```

## System logs

Modules in pub-server call a global 'opts.log(...)' provided by [logger-emitter](https://github.com/jldec/logger-emitter) to show warnings and errors on the console.

If you set `opts.redis._log = <key-name>`, the same events will be timestamped and logged into a [redis list](https://redis.io/topics/data-types-intro).

## Session logs

pub-server can record clicks and other events generated in the browser via the `/server/log/<path>?<params>` api.

HTTP requests sent to this endpoint will stored as objects containing the request path and parameters in the `session.log` and, if redis is enabled, automatically persisted with the session. E.g.

```js
fetch('/server/log' + location.pathname + (location.search || ''), { method:'POST'});
```

The default `/server/log` route can be configured by setting 'opts.session.logRequestPath'.

## Configuring session-based access control

Access control is configured on the server using environment variables `ACL_READ`, `ACL_EDIT`, `ACL_ADMIN`. These restrict read access to all pages (except those with `access:everyone`), edit access, and admin access respectively. Editors can also read, and admins can edit and read.

Each of the 3 ACLs contains a comma-separated list of user ids (typically email addresses). These are matched with the `session.user` at run time, which is established by an authentication plugin such as [pub-pkg-google-oauth](https://github.com/jldec/pub-pkg-google-oauth).

E.g. To grant yourself admin rights, and 3 other users read access:

```sh
export ACL_ADMIN={your-email}
export ACL_READ={email-1},{email-2},{email-3}
```
