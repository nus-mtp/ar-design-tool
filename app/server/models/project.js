"use strict";

module.exports = function(sequelize, DataTypes) {
	var Project = sequelize.define("project", {
		id:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: { 
			type: DataTypes.STRING,
			allowNull: false
		},
		company_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		marker_type: {
			type: DataTypes.STRING,
			allowNull: false
		},
		project_dat_file: {
			type: DataTypes.STRING,
			allowNull: false
		},
		assetbundle_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		date_created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		last_modified: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		last_published: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		timestamps: false,
		freezeTableName: true,
		classMethods: {
			create: function(models) {
			//   Project.create({
			//       username: 'stella'x
			//   })
			}
		}
	});
	return Project;
};