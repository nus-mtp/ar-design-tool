/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define("model", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		file_size: {
			type : DataTypes.DECIMAL,
			allowNull: false
		},
		file_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		file_extension: {
			type: DataTypes.STRING,
			allowNull: false
		},
		thumbnail_loc: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		timestamps: true,
		updatedAt: 'updateTimestamp',
		freezeTableName: true,
		classMethods: {
			insertTestModels: function() {
				sequelize.query("INSERT INTO model (id, uid, name, file_size, file_extension, file_name, createdAt, updateTimestamp) VALUES ('1', '1', 'Orange', 256, '3ds','orange.3ds', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
					sequelize.query("INSERT INTO model (id, uid, name, file_size, file_extension, file_name, createdAt, updateTimestamp) VALUES ('2', '2', 'Apple', 226, '3ds','apple.3ds', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
						sequelize.query("INSERT INTO model (id, uid, name, file_size, file_extension, file_name, createdAt, updateTimestamp) VALUES ('3', '1', 'Grape', 2, '3ds','grape.3ds', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
							// Results will be an empty array and metadata will contain the number of affected rows.
							console.log('created test models in db');
						});
					});	
				});	
			}
			// create: function(models) {
			//   Test.create({
			//       username: 'stella',
			//       user_id: 10
			//   })
			// }
		}
	});
	return Model;
};