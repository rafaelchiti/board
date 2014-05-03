var gulp = require('gulp');

var webappTasks = require('./webapp/gulp_tasks');

Object.keys(webappTasks).forEach(function(key) {
  gulp.task(key, webappTasks[key]);
});

gulp.task('default', ['dev']);

console.log('Adding the following tasks from the web app gulp file: \n', Object.keys(webappTasks));