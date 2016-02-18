var engine			= require('express-dot-engine'),
	session 		= require('express-session'),
	cookieParser 	= require('cookie-parser')
	passport		= require('passport'),
	express			= require('express'),
	morgan			= require('morgan'),
	glob			= require('glob'),
	path			= require('path');

var app = express(),
	port = process.env.PORT || 3000;

var routes = require('./server/routes/router');

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

//set static files
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/server', express.static(path.join(__dirname, 'server')));
app.use('/vendors', express.static(path.join(__dirname, 'bower_components')));
app.use('/resources', express.static(path.join(__dirname, 'public/resources')));
app.use('/vumixEditorApp', express.static(path.join(__dirname, 'public/vumixEditorApp')));
app.use('/vumixManagerApp', express.static(path.join(__dirname, 'public/vumixManagerApp')));

app.use('/', routes);

// var syncdb = require('./server/modules/syncdb')
	// files.forEach(function(file){
	// 	var model = db.import(file);
	// 	// console.log(model)
	// 	models[model.name] = model;
	// });
	// for (var model in models) {
	// 	console.log(model)
	// }
// var CONFIG_DB = require('./server/config/db');
// var db = new seq(CONFIG_DB.url);
// var googleUser = db.import(path.join(__dirname + '/server/models/user'));

var models = require('./server/models/');

models.sequelize.sync().then(function() {
	app.listen(port, function() {
		console.log('//===============')
	    console.log('listening on *: ' + port);
	});
});
