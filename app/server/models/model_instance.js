"use strict";

module.exports = function(sequelize, DataTypes) {
	var Model_instance = sequelize.define("model_instance", {
		id: {
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
			associate: function(models) {
				Model_instance.belongsTo(models.model);
			},
			create: function(models) {
			}
		}
	});
	return Model_instance;
};