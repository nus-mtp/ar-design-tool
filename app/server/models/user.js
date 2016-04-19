/*jslint node: true */
/**
 * @module User
 * @parent Models
 * User is the database model which stores the user's account metadata 
 * This module is auto loaded by SequelizeJS 
 */
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
			},
			insertTestUsers: function() {
				sequelize.query("INSERT INTO googleusers (id, name, token, email, createdAt, updateTimestamp) VALUES ('1', 'Jeffrey', 'iamtoken1', 'wawa1@wawa.com', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
					sequelize.query("INSERT INTO googleusers (id, name, token, email, createdAt, updateTimestamp) VALUES ('2', 'John', 'iamtoken2', 'wawa2@wawa.com', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
						sequelize.query("INSERT INTO googleusers (id, name, token, email, createdAt, updateTimestamp) VALUES ('3', 'Michelle', 'iamtoken3', 'wawa3@wawa.com', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
							sequelize.query("INSERT INTO googleusers (id, name, token, email, createdAt, updateTimestamp) VALUES ('4', 'Stella', 'iamtoken4', 'wawa4@wawa.com', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
								sequelize.query("INSERT INTO googleusers (id, name, token, email, createdAt, updateTimestamp) VALUES ('5', 'WZ', 'iamtoken5', 'wawa5@wawa.com', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
									// Results will be an empty array and metadata will contain the number of affected rows.
									console.log('created test users in DB');
								});
							});
						});
					});	
				});	
			}
		}
	});
	return User;
};