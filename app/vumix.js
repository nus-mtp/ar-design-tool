var engine			= require('express-dot-engine'),
	session 		= require('express-session'),
	cookieParser 	= require('cookie-parser'),
	passport		= require('passport'),
	express			= require('express'),
	morgan			= require('morgan'),
	path			= require('path');

var app = express(),
	port 	= process.env.PORT || 3000;

var routes 		= require('./server/routes/router');
require('./server/modules/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
	secret: 'thisIsASecret cat',
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'dot');
app.enable('view cache');

//set static files
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/server', express.static(path.join(__dirname, 'server')));
app.use('/vendors', express.static(path.join(__dirname, 'bower_components')));
app.use('/resources', express.static(path.join(__dirname, 'public/resources')));
app.use('/vumixEditorApp', express.static(path.join(__dirname, 'public/vumixEditorApp')));
app.use('/vumixManagerApp', express.static(path.join(__dirname, 'public/vumixManagerApp')));

app.use('/', routes);

app.listen(port, function() {
	console.log('//===============')
    console.log('listening on *: ' + port);
});