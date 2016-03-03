"use strict";

module.exports = function(sequelize, DataTypes) {
	var Model_instance = sequelize.define("model_instance", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true
		},
		userID: {
			type: DataTypes.STRING,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		clickable: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		timestamps: false,
		freezeTableName: true,
		classMethods: {
			associate: function(models) {
				Model_instance.belongsTo(models.model);
				Model_instance.belongsTo(models.project);
			},
			create: function(models) {
			}
		}
	});
	return Model_instance;
};