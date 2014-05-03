module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/palette', function(req, res) {
    res.render('color_palette');
  });
};