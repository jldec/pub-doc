# Command Line Options

#### Usage: `pub [options] [dir]`
Specifying dir will direct pub to a different working directory.

##### `-h, --help`
Output usage information on the command line.

##### `-p, --port {port}`
Override the default server port [3001].

##### `-t, --theme {name}`
Override the default theme with different module-name or dir, repeatable.

##### `-o, --output-path {dir}`
Override the default output directory [.].

##### `-O, --output-only`
Generate a set of output html together with static files into the output directory, and exit.

##### `-G, --html-only`
Output only generated html files and exit.

##### `-r, --root <prefix>`
Prefix urls with a static root, "." means path relative.

##### `-s, --static {dir}`
Override default static directory [.].
Also supports {dir},{route}.  E.g. `pub -s ./static/img,./images`.

##### `-S, --static-only {dir}`
Serve only static files from {dir}. May use output options from pub-config.

##### `-C, --config`
Show the current configuration on the command line and exit.

##### `-I, --ignore-config`
Ignore the pub-config file in the current directory. This is useful when previewing a README in a directory which is being used for a site or theme with a pub-config.

##### `-P, --pages`
Show a list of pages and templates on the command line and exit.

##### `-w, --watch-pkgs`
Also watch inside packages, useful during package development.

##### `-W, --no-watch`
Disable the watcher, E.g. to prevent watching network directories.

##### `-K, --no-sockets`
Disable websockets, E.g. to reduce noise while debugging.

##### `-E, --no-editor`
Serve the rendered HTML only, no built-in editor.

##### `-m, --minify`
Minify browser scripts to reduce their download size (implicit with -O)

##### `-d, --dbg`
Serve scriptmaps with browser scripts, and send DEBUG to the client-side.

##### `-D, --debug`
Start node with --debug for server-side debugging (also implies -d)

##### `-B, --debug-brk`
Start node with --debug-brk (also implies -d)
