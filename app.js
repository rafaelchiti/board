var hbs = require('hbs');
var express = require('express');
var stylus = require('stylus');
var browserify = require('browserify-middleware');

var app = express();

app.engine('html', hbs.__express);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/web/server/views');
app.use(express.logger());


browserify.settings.development('basedir', __dirname);

browserify.settings({
  transform: ['reactify'],
  extensions: ['.js', '.jsx'],
  grep: /\.jsx?$/
})

app.use('/js', browserify('./web/client'));

app.use(stylus.middleware({
  src: __dirname + '/web/assets/stylesheets',
  dest: __dirname + '/web/public',
  linenos: true
}));

app.use(express.static(__dirname + '/web/public'));

app.get('/', function(req, res) {
  res.render('index');
});

cards = [
  {
    id: 1,
    title: 'Issue 1',
    description: 'This is the issue 1'
  },
  {
    id: 2,
    title: 'Issue 2',
    description: 'This is the issue 2'
  }
];


app.get('/api/cards', function(req, res) {
  res.send(cards);
});




var port = process.env.PORT || 4000;
app.listen(port);

console.log("Listening on port " + port);
