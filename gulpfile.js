var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var open = require("open");

var webappTasks = require('./webapp/gulp_tasks');

console.log('Adding the following tasks from the web app gulp file: \n', Object.keys(webappTasks));

Object.keys(webappTasks).forEach(function(key) {
  gulp.task(key, webappTasks[key]);
});

gulp.task('run-app', function () {
  nodemon({script: 'app.js', env: {'NODE_ENV': 'development'}});
})

gulp.task('open-app', function() {
  open("http://localhost:4000");
});

gulp.task('default', ['dev', 'run-app', 'open-app']);

