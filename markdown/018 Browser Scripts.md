# Browser Scripts

In addition to generating HTML from markdown, `pub-server` can bundle browser scripts using [browserify](https://github.com/substack/node-browserify).

This makes it easy to serve front-end scripts which `require()` npm modules just like node.js server-side code.

Browser scripts are served live, and also saved to output when a site is generated.

#### JSX and ES6

As of v1.9.13, pub-server will automatically transform scripts ending in `.jsx` or `.es6` using [bablify](https://github.com/babel/babelify), making it easy to serve Reactjs components as well. E.g

The `pub-config` entry below will serve `/js/ui.js` as a result of browserifying & babelifying `/jsx/ui.jsx`.

```js
browserScripts: { path:'./jsx/ui.jsx', route:'/js/ui.js', inject:true }
```

Currently, each browser script has to be configured separately - there is no globbing.

Here is a (non-ideomatic) reactjs script which can be served in this way.

```js
import React from 'react';
import { render } from 'react-dom';

var pages = [];
var errMsg = '';

var HelloMessage = React.createClass({
  render: function() {
    return <span>Hello: {this.props.status}</span>;
  }
});

$.getJSON(pubRef.relPath + '/pages.json')
  .fail(function(jqXHR) { errMsg = 'unable to load /pages.json'; })
  .done(function(data) { pages = data; })
  .always(function() {
    render(
      <HelloMessage status={errMsg || pages.length} />,
      document.getElementById('headertext')
    );
  });
```

NOTE: Scripts that do not include other modules or don't require any transformation, are easier to serve as [](static-files).
