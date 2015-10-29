// pub-config for the pub-doc documentation project
// uses pub-theme-doc

var opts = module.exports = {

  appUrl: 'http://jldec.github.io/pub-doc',
  docTitle: 'pub-server',
  docSubTitle: 'documentation',
  github: 'http://github.com/jldec/pub-server',
  copyright: 'Copyright (c) 2015 Jürgen Leschner - github.com/jldec - MIT license',

  pkgs: [
    'pub-theme-doc',
    'pub-pkg-prism',
    'pub-pkg-font-awesome',
    'pub-pkg-seo'
  ],

  sources: [
  { path: './markdown',
    writable: true }
  ],

  outputs: [
  { path: './out',
    relPaths: true }
  ],

  staticPaths: [
    { path:'./static', depth:3, glob:'**/*.{png,pdf,*}'},
    './.gitignore',
    './.nojekyll'
  ],

}
