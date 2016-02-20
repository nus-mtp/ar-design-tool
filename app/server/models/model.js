"use strict";

module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define("model", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull : false
		},
		name: {
			type: DataTypes.STRING
		},
		file_size: {
			type : DataTypes.DECIMAL
		},
		file_extension: {
			type: DataTypes.STRING
		},
		date_uploaded:{
			type: DataTypes.DATE
		},
		file_location:{
			type: DataTypes.STRING
		}
	}, {
		timestamps: true,
		updatedAt: 'updateTimestamp',
		freezeTableName: true,
		classMethods: {
			create: function(models) {
			//   Test.create({
			//       username: 'stella',
			//       user_id: 10
			//   })
			}
		}
	});
	return Model;
};