var hbs = require('hbs');
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');

var app = express();

configureTemplateEngine();
configureStylesheetPreprocessor();
app.use(express.logger());
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 4000;
app.listen(port);

console.log("Listening on port " + port);

require('./server/routes')(app);


function configureStylesheetPreprocessor() {
  function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('linenos', true)
      .use(nib());
  };

  app.use(stylus.middleware({
    src: __dirname + '/assets/stylesheets',
    dest: __dirname + '/public',
    compile: compile
  }));
};

function configureTemplateEngine() {
  hbs.registerPartials(__dirname + '/server/views/partials');
  app.engine('html', hbs.__express);

  app.set('view engine', 'hbs');

  app.set('views', __dirname + '/server/views');
};