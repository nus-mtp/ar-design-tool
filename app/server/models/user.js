var seq = require('sequelize');

var User = seq.define('googleUser', {
	id: seq.INTEGER.UNSIGNED, //need to set to incremental
	name: seq.STRING,
	token: seq.STRING,
	email: seq.STRING,
	googleId: seq.STRING
});

module.exports = User;