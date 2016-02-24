var engine			= require('express-dot-engine'),
	session 		= require('express-session'),
	cookieParser 	= require('cookie-parser'),
    bodyParser      = require('body-parser'),
	passport		= require('passport'),
	express			= require('express'),
	morgan			= require('morgan'),
	glob			= require('glob'),
	path			= require('path');

var parse = require('./server/modules/parser.js');
parse.processArg();

var app = express(),
	port = process.env.PORT || 3000;

var routes          = require('./server/routes/router');
var users           = require('./server/routes/users');
var projects        = require('./server/routes/projects');
var models          = require('./server/routes/models');
var modelEntities   = require('./server/routes/modelEntities');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
	secret: 'thisIsASecret cat',
	saveUninitialized: true,
	resave: true
}));

app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'dot');
app.enable('view cache');

require('./server/modules/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set static files
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/server', express.static(path.join(__dirname, 'server')));
app.use('/vendors', express.static(path.join(__dirname, 'bower_components')));
app.use('/resources', express.static(path.join(__dirname, 'public/resources')));
app.use('/vumixEditorApp', express.static(path.join(__dirname, 'public/vumixEditorApp')));
app.use('/vumixManagerApp', express.static(path.join(__dirname, 'public/vumixManagerApp')));

//set web routing
app.use('/', routes);

//set restful api routing
app.use('/api/users', users);
app.use('/api/users/:userId/projects', projects);
app.use('/api/users/:userId/models', models);
app.use('/api/projects/:projectId/models', modelEntities);

var models = require('./server/models/');

models.sequelize.sync().then(function() {
	app.listen(port, function() {
	    console.log('listening on *: ' + port);
	});
});

module.exports = app;