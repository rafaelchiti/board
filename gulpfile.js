var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var open = require("open");

require('./webapp/gulpfile');

gulp.task('start-app', function () {
  nodemon({script: 'app.js', env: {'NODE_ENV': 'development'}});
})

gulp.task('dev', ['bundle:app:watch', 'bundle:test:watch']);

gulp.task('default', ['dev', 'start-app']);

