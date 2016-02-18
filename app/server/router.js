var engine	= require('express-dot-engine');
var path	= require('path');

module.exports = function(app) {
  //set templating engine route
  app.engine('dot', engine.__express);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'dot');
  app.enable('view cache');
  
  //set route
  app.get('/', function(req, res) {
    res.render('indexView');
  });  
  
  app.get('/manager', function(req, res) {
    res.render('vumixManagerView');
  });
  
  app.get('/editor', function(req, res) {
    res.render('vumixEditorView');
  });
};