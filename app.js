var hbs = require('hbs');
var express = require('express');
var stylus = require('stylus');
var browserify = require('browserify-middleware');

var app = express();

app.engine('html', hbs.__express);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/webapp/server/views');
app.use(express.logger());


browserify.settings.development('basedir', __dirname);

browserify.settings({
  transform: ['reactify'],
  extensions: ['.js', '.jsx'],
  grep: /\.jsx?$/
})

app.use('/js', browserify('./webapp/client'));

app.use(stylus.middleware({
  src: __dirname + '/webapp/assets/stylesheets',
  dest: __dirname + '/webapp/public',
  linenos: true
}));

app.use(express.static(__dirname + '/webapp/public'));

app.get('/', function(req, res) {
  res.render('index');
});


var port = process.env.PORT || 4000;
app.listen(port);

console.log("Listening on port " + port);
