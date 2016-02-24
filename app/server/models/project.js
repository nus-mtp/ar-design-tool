"use strict";

module.exports = function(sequelize, DataTypes) {
	var Project = sequelize.define("project", {
		id:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull : false
		},
		name: {
			type: DataTypes.STRING
		},
		company_name: {
			type: DataTypes.STRING
		},
		marker_type: {
			type: DataTypes.STRING
		},
		date_created: {
			type : DataTypes.DATE
		},
		last_modified: {
			type : DataTypes.DATE
		},
		last_published: {
			type: DataTypes.DATE
		}
	}, {
		timestamps: false,
		freezeTableName: true,
		classMethods: {
			associate: function(models) {
				Project.hasMany(models.model_instance);
				Project.hasMany(models.state);
			},
			create: function(models) {
			//   Project.create({
			//       username: 'stella'
			//   })
			}
		}
	});
	return Project;
};