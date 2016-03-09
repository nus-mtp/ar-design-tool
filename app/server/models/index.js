/*jslint node: true */
"use strict";

var Sequelize 	= require('sequelize'),
	path 		= require('path'),
	fs 			= require('fs');

var parse = require(path.join(__dirname + '/../modules/parser'));
var CONFIG_DB;

if(process.env.NODE_ENV == 'test-travis') {
	CONFIG_DB = require(path.join(__dirname + '/../config/travisdb'));
} else {
	CONFIG_DB = require(path.join(__dirname + '/../config/db'));
}


if(parse.getRemoteDB()) {
	CONFIG_DB = CONFIG_DB.remote;
} else {
	CONFIG_DB = CONFIG_DB.local;
}

var sequelize = new Sequelize(CONFIG_DB.url);
var db = {};

fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf(".") !== 0) && (file !== "index.js");
	}).forEach(function(file) {
		var model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName) {
	if("associate" in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;