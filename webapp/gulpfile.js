var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var glob = require('glob');
var open = require("gulp-open");

var vendors = ['jquery', 'react', 'underscore', 'backbone'];

gulp.task('vendor', function() {
  var b = browserify('./client/vendor/vendor.js');

  vendors.forEach(function(file) {
    b.require(file);
  });

  b.bundle()
    .pipe(source('vendor_bundle.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('lib', function() {
  var b = browserify('./client/lib/lib.js');

  vendors.forEach(function(file) {
    b.external(file);
  });

  b.bundle()
    .pipe(source('lib_bundle.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('client', function() {

  var b = browserify('./client/client.js', {extensions: ['.js', '.jsx']});

  vendors.forEach(function(file) {
    b.external(file);
  });

  b.bundle({debug: true})
    .pipe(source('client_bundle.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('prepare-tests', function() {

    var specs = glob('./client/**/*_spec.js', {sync: true});

    if (specs.length === 0)
      return;

    var b = browserify(specs, {extensions: ['.js', '.jsx']});

    vendors.forEach(function(file) {
      b.external(file);
    });

    b.bundle({debug: true})
      .pipe(source('bundled_tests.js'))
      .pipe(gulp.dest('./tmp/tests/'));
});


gulp.task('dev', function() {
  gulp.start('vendor');
  gulp.start('lib');
  gulp.start('client');
  gulp.start('prepare-tests');
  gulp.watch(['./client/board/**/*.js', './client/board/**/*.jsx'], ['client', 'prepare-tests']);
  gulp.src("./test/runner.html").pipe(open());
});
