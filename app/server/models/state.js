"use strict";

module.exports = function(sequelize, DataTypes) {
	var State = sequelize.define("state", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull : false
		},
		name: {
			type: DataTypes.STRING
		},
		thumbnail: {
			type : DataTypes.STRING
		}
	}, {
		timestamps: false,
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
	return State;
};
