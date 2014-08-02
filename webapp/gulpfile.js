var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var glob = require('glob');
var open = require("gulp-open");
var path = require('path');
var gutil = require('gulp-util');

gulp.task('bundle:app', bundleAppWith(browserify));
gulp.task('bundle:app:watch', bundleAppWith(watchify, {debug: true}));

gulp.task('bundle:test', bundleTestWith(browserify));
gulp.task('bundle:test:watch', bundleTestWith(watchify, {debug: true}));


// Utility functions

function bundleAppWith(bundlerFn, bundleOpts) {
  return function() {
    return bundle(
      bundlerFn,
      [__dirname + '/client/vendor/vendor.js', __dirname + '/client/lib/lib.js', __dirname + '/client/client.js'],
      __dirname + '/public/js/app_bundle.js',
      bundleOpts
    );
  };
}

function bundleTestWith(bundlerFn, bundleOpts) {
  return function() {
    return bundle(
      bundlerFn,
      [__dirname + '/client/vendor/vendor.js', __dirname + '/client/lib/lib.js', glob.sync(__dirname + '/client/src/**/*_spec.coffee')],
      __dirname + '/tmp/test_bundle.js',
      bundleOpts
    );
  };
}

function bundle(bundlerFn, entries, outFile, bundleOpts) {
  var bundler = bundlerFn({
    entries: entries,
    extensions: ['.js', '.jsx', '.coffee']
  });

  bundler.on('update', rebundle);
  bundler.on('log', gutil.log);

  function rebundle () {
    return bundler.bundle(bundleOpts || {})
      .on('error', function(err) { gutil.log('ERROR: ' + err.message); gutil.beep(); })
      .pipe(source(path.basename(outFile)))
      .pipe(gulp.dest(path.dirname(outFile)));
  }

  return rebundle();
}
