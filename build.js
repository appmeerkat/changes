'use strict';

var path       = require('path'),
    fs         = require('fs'),
    browserify = require('browserify'),
    babelify   = require('babelify'),
    bundlePath = path.join(__dirname, 'build', 'changes.js');

browserify('./src/changes.js', { debug: true })
  .transform(babelify)
  .bundle()
  .on('error', function (err) { console.error(err); })
  .pipe(fs.createWriteStream(bundlePath));

