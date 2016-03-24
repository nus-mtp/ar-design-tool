var engine			= require('express-dot-engine'),
	session			= require('express-session'),
	cookieParser 	= require('cookie-parser'),
  	bodyParser      = require('body-parser'),
	passport		= require('passport'),
	express			= require('express'),
	morgan			= require('morgan'),
	glob			= require('glob'),
	path			= require('path');

var	file_path 	= require(path.join(__dirname, '/server/config/file_path')),	
	utils		= require(path.join(__dirname, '/server/modules/utils'));


var parse = require('./server/modules/parser.js');
parse.processArg();

// Make sure storage folder exists
utils.checkExistsIfNotCreate(path.join(__dirname, file_path.storage_path));

var app = express(),
	port = process.env.PORT || 3000;

var users           = require('./server/routes/users');
var routes          = require('./server/routes/router');
var models          = require('./server/routes/models');
var projects        = require('./server/routes/projects');
var unity           = require('./server/routes/unity');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'podjgoqwpeignIQWEPEIOGASgthisIsASecretCatQ12113gSAGAGQ51236'
}));

app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'dot');
app.enable('view cache');

// setup passportjs
require('./server/modules/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set static files
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/vendors', express.static(path.join(__dirname, 'bower_components')));

//static files for webgl
app.use('/assetbundles', express.static(path.join(__dirname, 'public/resources/webgl/assetbundles')));
app.use('/TemplateData', express.static(path.join(__dirname, 'public/resources/webgl/TemplateData')));

//set web routing
app.use('/', routes);

//set restful api routing
app.use('/api/users', users);
app.use('/api/users/:userId/projects', projects);
app.use('/api/users/:userId/models', models);

//set routing for webgl api calls
app.use('/', unity);

var models = require('./server/models/');

models.sequelize.sync().then(function() {
	// if(process.env.NODE_ENV == 'test-travis') {
		// models.googleUser.insertTestUsers();
		// models.project.insertTestProjects();
		// models.model.insertTestModels();
	// }
	app.listen(port, function() {
	    console.log('listening on *: ' + port);
	});
});

module.exports = app;