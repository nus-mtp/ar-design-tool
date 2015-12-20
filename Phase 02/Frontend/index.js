var express = require('express');
var config = require('./config');
var path = require('path');

var app = express();
var port = config.port;
var root = path.join(__dirname, '/web');

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: root});
});

app.get('/babylon', function(req, res) {
    res.sendFile('babylon/babylon_demo.html', {root: root});
});

app.get('/minko', function(req, res) {
    res.sendFile('minko/minko_demo.html', {root: root});
});

app.get('/three', function(req, res) {
    res.sendFile('three/three_demo.html', {root: root});
});

app.get('*', function(req, res) {
    res.sendFile('_shared/error404.html', {root: root});
});

app.listen(port);
console.log("Server is listening at " + port);