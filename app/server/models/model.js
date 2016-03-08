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
		file_extension: {
			type: DataTypes.STRING,
			allowNull: false
		},
		file_location: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: true,
		updatedAt: 'updateTimestamp',
		freezeTableName: true,
		classMethods: {
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