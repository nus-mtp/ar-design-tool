var express	= require('express')
var engine	= require('express-dot-engine');
var path	= require('path');

var app = express();

app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'dot');
app.enable('view cache');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/vendors', express.static(path.join(__dirname, 'bower_components')));

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/login', function (req, es) {
	res.render('login');
});

app.listen(3000, function() {
    console.log('listening on *:3000');
});
