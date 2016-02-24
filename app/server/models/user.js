"use strict";

module.exports = function(sequelize, dataTypes) {
	var User = sequelize.define('googleUser', {
		id: {
			type: dataTypes.STRING,
			primaryKey: true
		}, 
		name: {
			type: dataTypes.STRING
		}, 
		token: dataTypes.STRING,
		email: dataTypes.STRING
	}, {
		timestamps: true,
		updatedAt: 'updateTimestamp',
		classMethods: {
			associate: function(models) {
				User.hasMany(models.project);
			}
		}
	});
	return User
}