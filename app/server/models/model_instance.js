"use strict";

module.exports = function(sequelize, DataTypes) {
	var Model_instance = sequelize.define("model_instance", {
		model_id:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull : false
		} ,
		clickable: {
			type: DataTypes.BOOLEAN
		}
	}, {
		timestamps: false,
		freezeTableName: true,
		classMethods: {
			create: function(models) {
			}
		}
	});
	return Model_instance;
};