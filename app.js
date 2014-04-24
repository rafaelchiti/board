var hbs = require('hbs');
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var browserify = require('browserify-middleware');
var reactify = require('reactify');

var app = express();

hbs.registerPartials(__dirname + '/webapp/server/views/partials');
app.engine('html', hbs.__express);

app.set('view engine', 'hbs');

app.set('views', __dirname + '/webapp/server/views');

app.use(express.logger());

var reactifyES6 = function(file) {
  return reactify(file, {'es6': true});
};

browserify.settings.development('basedir', __dirname);

browserify.settings({
  transform: [reactifyES6, 'es6ify'],
  extensions: ['.js', '.jsx'],
  grep: /\.jsx?$/
})

app.get('/js/all.js', browserify('./webapp/client/all.js'));


function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('linenos', true)
    .use(nib());
};

app.use(stylus.middleware({
  src: __dirname + '/webapp/assets/stylesheets',
  dest: __dirname + '/webapp/public',
  compile: compile
}));

app.use(express.static(__dirname + '/webapp/public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/palette', function(req, res) {
  res.render('color_palette');
});


var port = process.env.PORT || 4000;
app.listen(port);

console.log("Listening on port " + port);
