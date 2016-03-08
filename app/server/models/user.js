"use strict";

module.exports = function(sequelize, dataTypes) {
	var User = sequelize.define('googleUser', {
		id: {
			type: dataTypes.STRING,
			primaryKey: true,
			unique: true
		}, 
		name: {
			type: dataTypes.STRING,
			allowNull: false
		}, 
		token: {
			type: dataTypes.STRING,
			allowNull: false,
			unique: true
		},
		email: {
			type: dataTypes.STRING,
			allowNull: false,
			unique: true
		}
	}, {
		timestamps: true,
		updatedAt: 'updateTimestamp',
		classMethods: {
			associate: function(models) {
				User.hasMany(models.project, {
					foreignKey: {
						name: 'uid',
						allowNull: false
					}
				});
				User.hasMany(models.model, {
					foreignKey: {
						name: 'uid',
						allowNull: false
					}
				});
			}
		}
	});
	return User;
};