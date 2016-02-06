var engine			= require('express-dot-engine'),
	session 		= require('express-session'),
	cookieParser 	= require('cookie-parser'),
	mongoose		= require('mongoose'),
	express			= require('express'),
	morgan			= require('morgan'),
	path			= require('path');

var app 	= express(),
	port 	= process.env.PORT || 3000;

var routes 		= require('./server/routes/router');
var configDB 	= require('./server/config/database.js');
mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
	secret: 'thisIsASecret cat',
	saveUninitialized: true,
	resave: true
}));

app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'dot');
// app.enable('view cache');


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/server', express.static(path.join(__dirname, 'server')));
app.use('/views', express.static(path.join(__dirname, 'public/views')));
app.use('/partials', express.static(path.join(__dirname, 'public/views/partials')));

app.use('/', routes);

app.listen(port, function() {
    console.log('listening on *: ' + port);
});
