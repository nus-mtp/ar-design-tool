var express	= require('express');
var path	= require('path');
var router = require('./server/router');

var app = express();

//set static files
app.use('/vendors', express.static(path.join(__dirname, 'bower_components')));
app.use('/resources', express.static(path.join(__dirname, 'public/resources')));
app.use('/vumixEditorApp', express.static(path.join(__dirname, 'public/vumixEditorApp')));
app.use('/vumixManagerApp', express.static(path.join(__dirname, 'public/vumixManagerApp')));

//set router
router(app);

app.listen(3000, function() {
    console.log('listening on *:3000');
});
