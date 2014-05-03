var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var glob = require('glob');
var open = require("gulp-open");

var vendors = ['jquery', 'react', 'underscore', 'backbone'];

var tasks = {};

var browserifyArrayConfig = function(b, files, configFunc) {
  files.forEach(function(file) {
    b[configFunc](file);
  });

  return b;
};

tasks['client-vendor'] = function() {
  var b = browserify(__dirname + '/client/vendor/vendor.js');
  browserifyArrayConfig(b, vendors, 'require').bundle()
    .pipe(source('client_vendor_bundle.js'))
    .pipe(gulp.dest(__dirname + '/public/js'));
}

tasks['client-lib'] = function() {
  var b = browserify(__dirname + '/client/lib/lib.js');
  browserifyArrayConfig(b, vendors, 'external').bundle()
    .pipe(source('client_lib_bundle.js'))
    .pipe(gulp.dest(__dirname + '/public/js'));
};

tasks['client-src'] = function() {
  var b = browserify(__dirname + '/client/client.js', {extensions: ['.js', '.jsx']});
  browserifyArrayConfig(b, vendors, 'external').bundle({debug: true})
    .pipe(source('client_src_bundle.js'))
    .pipe(gulp.dest(__dirname + '/public/js'));
};

tasks['client-tests'] = function() {
  var specs = glob(__dirname + '/client/**/*_spec.js', {sync: true});

  if (specs.length === 0) return;

  var b = browserify(specs, {extensions: ['.js', '.jsx']});
  browserifyArrayConfig(b, vendors, 'external').bundle({debug: true})
    .pipe(source('client_test_bundle.js'))
    .pipe(gulp.dest(__dirname + '/tmp'));
};

tasks['client-test-runner'] = function() {
  gulp.src(__dirname + "/client/test/runner.html").pipe(open());
};

tasks['dev'] = function() {
  gulp.start('client-vendor');
  gulp.start('client-lib');
  gulp.start('client-src');
  gulp.start('client-tests');
  gulp.watch([__dirname + '/client/src/**/*.js', __dirname + '/client/board/**/*.jsx'], ['client-src', 'client-tests']);
  gulp.start('client-test-runner');
};


module.exports = tasks;
