var path	= require('path'),
	express	= require('express'),
	engine	= require('express-dot-engine');

var app = express();

app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'dot');
// app.enable('view cache');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/server', express.static(path.join(__dirname, 'server')));
app.use('/views', express.static(path.join(__dirname, 'public/views')));
app.use('/routes', express.static(path.join(__dirname, 'server/routes')));
app.use('/partials', express.static(path.join(__dirname, 'public/views/partials')));

var routes = require('./server/routes/router');

app.use('/', routes);

app.listen(3000, function() {
    console.log('listening on *:3000');
});
